package IgniteX_Project1.Mini_Digital_Banking_system.DTO;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.math.BigDecimal;

@Data
public class TransferRequestDTO {
    @NotBlank
    private String senderAccountNumber;

    @NotBlank
    private String receiverAccountNumber;

    @NotNull(message = "Amount is required") //This works for Big Decimal types since @NotBlank does not
    @DecimalMin(value = "1.0")
    private BigDecimal amount;

    @NotBlank
    @Size(min = 4, max = 4)
    private String pin;  //pin validation would occur here

//    private String narration;
}
