--CREATING THE USERS TABLE TO STORE USERS BIODATA

CREATE TABLE USERS(
user_id SERIAL PRIMARY KEY,
 first_name VARCHAR(50) NOT NULL,
 last_name VARCHAR(50) NOT NULL,
 full_name VARCHAR(100) GENERATED ALWAYS AS (first_name || ' ' || last_name),
 email VARCHAR(100) UNIQUE NOT NULL,
 phone_number  VARCHAR(50) UNIQUE NOT NULL,
 bvn VARCHAR(50) UNIQUE NOT NULL,
 user_password VARCHAR(50) NOT NULL,
 user_created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
 user_modified_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
 NIN_num VARCHAR(50) UNIQUE NULL,
 proof_of_address VARCHAR(100) UNIQUE NULL,
 pin AUTO GENERATED NOT NULL
); 

SELECT *
FROM USERS;

--CREATING THE ACCOUNT TABLE TO STORE THE ACCOUNT INFORMATION OF GIVEN USERS

CREATE TABLE ACCOUNT(
	account_id SERIAL PRIMARY KEY,
	user_id INT NOT NULL REFERENCES USERS(user_id) ON DELETE CASCADE,
	account_number VARCHAR(50) UNIQUE NOT NULL,
	balance DECIMAL(15,2) DEFAULT 0.00 CHECK (balance>=0),
	
	account_created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

SELECT *
FROM ACCOUNT;

--CREATING THE TRANSACTIONS TABLE THAT WOULD STORE ALL KINDS OF TRANSACTIONS(WITHDRAWALS, DEPOSITS, TRANSFER)

CREATE TABLE TRANSACTION(
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
FROM TRANSACTION;

--CREATING THE SEQUENCE THAT GENERATES A 9-DIGIT TRANSACTION ID
CREATE SEQUENCE transaction_id_seq
START WITH 100000001
INCREMENT BY 1;

--CREATING THE BENEFICIARIES TABLE THAT STORES THE FULLNAME, ACCOUNT NUMBER, 
CREATE TABLE BENEFICIARIES(
	beneficiaries_id,
	user_id INT NOT NULL REFERENCES USERS(user_id) ON DELETE CASCADE,
	account_id INT NOT NULL REFERENCES ACCOUNT(account_id) ON DELETE CASCADE,
	account_number VARCHAR(50),
	full_name	VARCHAR(50)
)



DROP TABLE TRANSACTION;


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
			INSERT INTO TRANSACTION(
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
			INSERT INTO TRANSACTION(
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

CREATE OR REPLACE PROCEDURE TRANSFER(
	sender_account_number VARCHAR(50),
	receiver_account_number VARCHAR(50),
	amount DECIMAL(15,2)
)
LANGUAGE plpgsql
AS $$
BEGIN
	--ENSURES THAT USER SENDS TO ANOTHER PERSON
	IF sender_account_number = receiver_account_number
	THEN RAISE EXCEPTION 'USER MUST SEND TO ANOTHER PERSON';
	END IF;
	--CALLING THE WITHDRAW FUNCTION 
	PERFORM WITHDRAW(sender_account_number, amount);
	--CALLING THE DEPOSIT FUNCTION
	PERFORM DEPOSIT(receiver_account_number, amount);
END;
$$

			