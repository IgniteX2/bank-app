--CREATING THE USERS TABLE TO STORE USERS BIODATA

CREATE TABLE USERS(
user_id SERIAL PRIMARY KEY,
 first_name VARCHAR(50) NOT NULL,
 last_name VARCHAR(50) NOT NULL,
 full_name VARCHAR(100) GENERATED ALWAYS AS (first_name || ' ' || last_name) STORED,
 email VARCHAR(100) UNIQUE NOT NULL,
 phone_number  VARCHAR(50) UNIQUE NOT NULL,
 bvn VARCHAR(50) UNIQUE NOT NULL,
 user_password VARCHAR(255) NOT NULL,
 user_created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
 user_modified_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
 NIN_num VARCHAR(50) UNIQUE NULL,
 proof_of_address VARCHAR(100) UNIQUE NULL,
 address VARCHAR(100),
 next_of_kin VARCHAR(100),
 next_of_kin_contact VARCHAR(50),
 nationality VARCHAR(50),
 source_of_income VARCHAR(50)
 
 pin AUTO GENERATED NOT NULL
); 

SELECT *
FROM USERS;

--CREATING THE FUNCTION THAT WOULD AUTO GENERATE THE ACCOUNT NUMBER
CREATE OR REPLACE FUNCTION GENERATE_ACCOUNT_NUMBER()
RETURNS VARCHAR(10)
LANGUAGE plpgsql
AS $$
DECLARE
    v_account_number VARCHAR(10);
BEGIN
    LOOP
        -- 67 + 8 random digits
        v_account_number := '67' ||
            FLOOR(10000000 + RANDOM() * 90000000)::TEXT;

        -- Ensure uniqueness
        IF NOT EXISTS (
            SELECT 1
            FROM accounts
            WHERE account_number = v_account_number
        ) THEN
            EXIT;
        END IF;
    END LOOP;

    RETURN v_account_number;
END;
$$;


--CREATING THE ACCOUNT TABLE TO STORE THE ACCOUNT INFORMATION OF GIVEN USERS

CREATE TABLE ACCOUNT(
	account_id SERIAL PRIMARY KEY,
	user_id INT NOT NULL REFERENCES USERS(user_id) ON DELETE CASCADE,
	account_number VARCHAR(10) UNIQUE NOT NULL DEFAULT GENERATE_ACCOUNT_NUMBER(),
	account_type VARCHAR(100),
	balance DECIMAL(15,2) DEFAULT 0.00 CHECK (balance>=0),
	pin INT NOT NULL,
	tier VARCHAR(50),
	account_created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

SELECT *
FROM ACCOUNT;


--CREATING THE SEQUENCE THAT GENERATES A 9-DIGIT TRANSACTION ID
CREATE SEQUENCE transaction_id_seq
START WITH 100000001
INCREMENT BY 1;


--CREATING THE TRANSACTIONS TABLE THAT WOULD STORE ALL KINDS OF TRANSACTIONS(WITHDRAWALS, DEPOSITS, TRANSFER)

CREATE TABLE TRANSACTIONS(
	 transaction_id BIGINT PRIMARY KEY DEFAULT nextval('transaction_id_seq'),
	sender_account_id INT REFERENCES ACCOUNT(account_id) ON DELETE SET NULL,
	receiver_account_id INT  REFERENCES ACCOUNT(account_id) ON DELETE SET NULL,
	transaction_type VARCHAR(50) NOT NULL,
	amount DECIMAL(15,2) NOT NULL CHECK(amount>0),
	status VARCHAR(50) NOT NULL DEFAULT 'PENDING',
	description VARCHAR(150),
	transaction_created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

SELECT *
FROM TRANSACTIONS;



--CREATING THE BENEFICIARIES TABLE THAT STORES THE FULLNAME, ACCOUNT NUMBER, 
CREATE TABLE BENEFICIARIES(
	beneficiaries_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	user_id INT NOT NULL REFERENCES USERS(user_id) ON DELETE CASCADE,
	account_id INT NOT NULL REFERENCES ACCOUNT(account_id) ON DELETE CASCADE,
	account_number VARCHAR(50) NOT NULL,
	beneficiary_name	VARCHAR(50) NOT NULL,
	isFavorite BOOLEAN NOT NULL DEFAULT FALSE,
	beneficiary_created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

	--User should not save beneficiary twice
	  UNIQUE(user_id, account_number)
)


SELECT *
FROM BENEFICIARIES;




--3 STORED PROCEDURES NEEDED FOR THE TASK
-- DEPOSIT_MONEY(account_num, amount) : IT'LL UPDATE THE BALANCE IN THE ACCOUNT TABLE
					--AND INSERT A ROW IN THE TRANSACTIONS TABLE AS A DEPOSIT

CREATE OR REPLACE FUNCTION DEPOSIT(account_num VARCHAR(50) , amount DECIMAL(15,2))  
			
		RETURNS DECIMAL(15,2)
		LANGUAGE plpgsql
		AS $$
		DECLARE
		v_balance DECIMAL(15,2);
		BEGIN
			--Check if amount is a positive number
			IF amount <= 0
				THEN RAISE EXCEPTION 'MUST BE A POSITIVE AMOUNT';
			END IF;

			--Feed the balance
			SELECT balance
			INTO v_balance
			FROM ACCOUNT
			WHERE account_number = account_num;

			--If account number is not found
			IF NOT FOUND
			THEN RAISE EXCEPTION ' ACCOUNT NUMBER IS NOT FOUND';
			END IF;

		
			--PERFORM THE BALANCE INCREMENT			
			 v_balance := v_balance + amount;
			 UPDATE ACCOUNT
			 SET
			 	balance = v_balance
			 WHERE account_number = account_num;

			-- INSERT THE NEW ROW INTO THE TRANSACTIONS TABLE
			INSERT INTO TRANSACTIONS(
			sender_account_id,
			receiver_account_id,
			transaction_type,
			amount,
			status,
			description
			)
			SELECT
				NULL,
				account_id,
				'DEPOSIT',
				amount,
				'SUCCESS',
				'Cash deposited'

			FROM ACCOUNT
			WHERE account_number = account_num;
							 
			 RETURN v_balance;

		END;	
$$;



--WITHDRAW(account_num, amount) : CHECKS BALANCE{ IF LESS THAN, PRINT 'INSUFFICIENT FUNDS'} , 
				-- UPDATE THE BALANCE IN THE ACCOUNT TABLE
				--AND INSERT A ROW IN THE TRANSACTIONS TABLE AS A WITHDRAWAL

CREATE OR REPLACE FUNCTION WITHDRAW(account_num VARCHAR(50) , amount DECIMAL(15,2))  
			
		RETURNS DECIMAL(15,2)
		LANGUAGE plpgsql
		AS $$
		DECLARE
		v_balance DECIMAL(15,2);
		BEGIN
			--Check if amount is a positive number
			IF amount <= 0
				THEN RAISE EXCEPTION 'MUST BE A POSITIVE AMOUNT';
			END IF;

			--Feed the balance
			SELECT balance
			INTO v_balance
			FROM ACCOUNT
			WHERE account_number = account_num;

			--If account number is not found
			IF NOT FOUND
			THEN RAISE EXCEPTION ' ACCOUNT NUMBER IS NOT FOUND';
			END IF;

			--Check if balance is less than amount
			IF v_balance < amount
			THEN RAISE EXCEPTION 'INSUFFICIENT FUNDS';
			END IF;

			--PERFORM THE BALANCE DEDUCTION			
			 v_balance := v_balance - amount;
			 UPDATE ACCOUNT
			 SET
			 	balance = v_balance
			 WHERE account_number = account_num;

			-- INSERT THE NEW ROW INTO THE TRANSACTIONS TABLE
			INSERT INTO TRANSACTIONS(
			sender_account_id,
			receiver_account_id,
			transaction_type,
			amount,
			status,
			description
			)
			SELECT
				account_id,
				NULL,
				'WITHDRAW',
				amount,
				'SUCCESS',
				'Cash withdrawal'

			FROM ACCOUNT
			WHERE account_number = account_num;
							 
			 RETURN v_balance;

		END;	
$$;

				
--TRANSFER(): CONFIRMS THE RECEIVER'S ACCOUNT EXISTS
			--CONFIRMS SUFFICIENT BALANCE IN SENDER'S ACCOUNT
			--UPDATE THE BALANCE IN THE ACCOUNT TABLE FOR BOTH PARTIES
			--AND INSERT A ROW IN THE TRANSACTIONS TABLE AS A TRANSFER


CREATE OR REPLACE PROCEDURE TRANSFER_MONEY(
    sender_account_number VARCHAR(50),
    receiver_account_number VARCHAR(50),
    amount DECIMAL(15,2)
)
LANGUAGE plpgsql
AS $$
DECLARE
    v_sender_id   INT;
    v_receiver_id INT;
BEGIN
    IF sender_account_number = receiver_account_number THEN
        RAISE EXCEPTION 'USER MUST SEND TO ANOTHER PERSON';
    END IF;

    -- DEADLOCK PREVENTION: Fetch both account IDs first,
    -- then lock them in a consistent order (lowest ID first).
    -- This ensures two concurrent transfers never lock in opposite orders.
    SELECT account_id INTO v_sender_id
    FROM ACCOUNT WHERE account_number = sender_account_number;

    SELECT account_id INTO v_receiver_id
    FROM ACCOUNT WHERE account_number = receiver_account_number;

    IF v_sender_id IS NULL   THEN RAISE EXCEPTION 'SENDER ACCOUNT NOT FOUND'; END IF;
    IF v_receiver_id IS NULL THEN RAISE EXCEPTION 'RECEIVER ACCOUNT NOT FOUND'; END IF;

    -- Lock in consistent order to prevent deadlocks
    IF v_sender_id < v_receiver_id THEN
        PERFORM pg_advisory_xact_lock(v_sender_id);
        PERFORM pg_advisory_xact_lock(v_receiver_id);
    ELSE
        PERFORM pg_advisory_xact_lock(v_receiver_id);
        PERFORM pg_advisory_xact_lock(v_sender_id);
    END IF;

    --ATOMICITY: Both operations succeed or both roll back
    PERFORM WITHDRAW(sender_account_number, amount);
    PERFORM DEPOSIT(receiver_account_number, amount);

EXCEPTION
    WHEN OTHERS THEN
        RAISE; -- Rolls back the entire transaction automatically
END;
$$;