import React from 'react'
import { FaRegUserCircle, FaUser } from 'react-icons/fa'
import { FaRegFlag, FaFlag, FaEnvelope, FaEnvelopeCircleCheck, FaLock, FaEye, FaEyeSlash, FaRegCopyright, FaPhone, FaMapLocationDot } from 'react-icons/fa6'
import { RiPhoneLockLine } from 'react-icons/ri'
import { MdContactPhone, MdError, MdOutlineAlternateEmail, MdPassword } from 'react-icons/md'
import { FaCircleCheck } from 'react-icons/fa6'
import { TbWorld } from "react-icons/tb"
import { IoIosArrowDown } from 'react-icons/io'
import { GoDotFill } from 'react-icons/go'
import { BsBank } from 'react-icons/bs'
import { BiWorld } from 'react-icons/bi'
import { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import Select from 'react-select'
import { Link } from "react-router-dom";
import API from '../services/api'
import { registerUser } from '../services/authService'
import { toast } from "react-toastify";
import { ThemeContext } from "../context/ThemeContext";


function Register() {

  const { theme, toggleTheme } = useContext(ThemeContext);

  const [step, setStep] = useState(1)
  const [piN, setPiN] = useState(["", "", "", ""]);
  const [inputValue, setInputValue] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    bvn: "",
    userPassword: "",
    NInNum: "",
    nationality: "",
    address: "",
  })
  const [touched, setTouched] = useState({
    firstName: false,
    lastName: false,
    email: false,
    phoneNumber: false,
    bvn: false,
    userPassword: false,
    NInNum: false,
    nationality: false,
    address: false,
  })
  const [errorMsg, setErrorMsg] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    bvn: "",
    userPassword: "",
    NInNum: "",
    nationality: "",
    address: "",
  })
  const [isViewPassword, setIsViewPassword] = useState(false);

  const handleChange = (input) => {
    setInputValue((prev) => ({
      ...prev,
      [input.name]: input.value
    }))
  }

  const handleShowPassword = () => {
    setIsViewPassword((prev) => !prev);
  };

  // FORM VALIDATION FUNCTION
  useEffect(() => {
    const timer = setTimeout(() => {
      
      // NAME VALIDATION
      inputValue.firstName.trim() === "" 
        ? setErrorMsg((prev) => ({
            ...prev,
            firstName: "This field is required"})
          )
        : setErrorMsg((prev) => ({
            ...prev,
            firstName: ""})
          )

      inputValue.lastName.trim() === "" 
        ? setErrorMsg((prev) => ({
            ...prev,
            lastName: "This field is required"})
          )
        : setErrorMsg((prev) => ({
            ...prev,
            lastName: ""})
          )

      // ADDRESS VALIDATION
      inputValue.address.trim() === "" 
        ? setErrorMsg((prev) => ({
            ...prev,
            address: "This field is required"})
          )
        : setErrorMsg((prev) => ({
            ...prev,
            address: ""})
          )

      // NATIONALITY VALIDATION
      inputValue.nationality.trim() === "" 
        ? setErrorMsg((prev) => ({
            ...prev,
            nationality: "This field is re]quired"})
          )
        : setErrorMsg((prev) => ({
            ...prev,
            nationality: ""})
          )

      // EMAIL VALIDATION
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

      inputValue.email.trim() === "" 
        ? setErrorMsg((prev) => ({
          ...prev,
          email: "This field is required"})
          ) 
        : !emailRegex.test(inputValue.email.trim()) 
        ? setErrorMsg((prev) => ({
          ...prev,
          email: "Enter a valid email address"})
        ) 
        : setErrorMsg((prev) => ({
          ...prev,
          email: ""})
        ) 

      // PASSWORD VALIDATION
      inputValue.userPassword.trim() === "" 
        ? setErrorMsg((prev) => ({
            ...prev,
            userPassword: "This field is required"})
          )
        : setErrorMsg((prev) => ({
            ...prev,
            userPassword: ""})
          )

      // PHONE VALIDATION
      const phoneRegex = /^(?:\d{11}|\+\d{1,3}\d{10})$/

      inputValue.phoneNumber.trim() === "" 
        ? setErrorMsg((prev) => ({
          ...prev,
          phoneNumber: "This field is required"})
          ) 
        : !phoneRegex.test(inputValue.phoneNumber.trim()) 
        ? setErrorMsg((prev) => ({
          ...prev,
          phoneNumber: "Enter a valid phone number"})
        ) 
        : setErrorMsg((prev) => ({
          ...prev,
          phoneNumber: ""})
        ) 

      // BVN / NIN VALIDATION
      inputValue.bvn || inputValue.NInNum.trim() === "" 
        ? setErrorMsg((prev) => ({
          ...prev,
          bvn: "This field is required",
          NInNum: "This field is required"})
          ) 
        : inputValue.bvn.trim().length || inputValue.NInNum.trim().length !== 11 
        ? setErrorMsg((prev) => ({
          ...prev,
          bvn: "Enter a valid BVN number",
          NInNum: "Enter a valid NIN number"})
        ) 
        : setErrorMsg((prev) => ({
          ...prev,
          bvn: "",
          NInNum: ""})
        ) 

    }, 1000)

    return () => clearTimeout(timer)
    
  }, [inputValue])

  // SELECT ACCOUNT TYPE FUNCTION


  // PASSWORD STRENGTH CHECK
  const hasUpperCase = /[A-Z]/
  const hasNumber = /\d/

  const hasError = Object.values(errorMsg).some(
    error => error === ""
  )

  const handleSubmit = async () => {
    console.log("submit fired");

    try {
      console.log(inputValue)
      const data = await registerUser(inputValue);

      console.log(data);

      toast.success("You have successfully created an acccout");
      setStep((prev) => prev + 1);
    } catch (error) {
      console.log("Signup error:", error);
      console.log("Status:", error.response?.status);
      console.log("Data:", error.response?.data);
    }
  };


  return (
    <div 
      className='min-h-screen w-full flex items-start justify-center bg-[#f5f5f5]' 
      >
      <div 
        className='w-full min-h-screen flex flex-col justify-between'>
        <header 
          className='flex items-center justify-between w-full bg-[#ffffff]'
          style={{padding: "14px 50px"}}>
          <div 
            className='bg-[#1A3A5C] rounded-md flex items-center justify-center'
            style={{padding: "8px 14px"}}>
            <p>⚡</p>
          </div>

          <div 
            className='flex items-center gap-6 font-normal text-[12px] text-[#0D1B2E]'>
            <div 
              className='rounded-full bg-[#FFFFFF] border border-[#0D1B2E]' 
              style={{padding: "6px"}}>
              <div className='flex items-center justify-center gap-1'>
                <FaCircleCheck 
                  className='border border-[#E7E8EA] rounded-full text-[20px] text-[#27A06E]' 
                  style={{padding: "1px"}} 
                />
                <p 
                  // className='hidden lg:block'
                >
                    1. Email
                </p>
              </div>
            </div>

            <div 
              className={`rounded-full bg-[#FFFFFF] border 
              ${step >= 2 
                ? "border-[#0D1B2E]" 
                : "border-[#E7E8EA]"}`} 
              style={{padding: "6px"}}>
              
              <div className='flex items-center justify-center gap-1  '>
                {step >= 2
                  ? <FaCircleCheck 
                      className='border border-[#E7E8EA] rounded-full text-[20px] text-[#27A06E]' 
                      style={{padding: "1px"}} 
                    />
                  : <RiPhoneLockLine 
                      className='border border-[#E7E8EA] rounded-full text-[20px] text-[#0D1B2E]' 
                      style={{padding: "1px"}} 
                    />
                  }
                <p 
                  // className='hidden lg:block'
                >
                  2. BVN / NIN
                </p>
              </div>
            </div>
          </div>

          <div 
            className='flex items-center bg-[#FFFFFF] rounded-md shadow-xs text-[#0D1B2E] gap-2 cursor-pointer' 
            style={{padding: "8px 16px"}}>
            <TbWorld />
            <p>ENG</p>
            <IoIosArrowDown />
          </div>
        </header>

        <section 
          className='flex flex-col items-center justify-center'
          style={{margin: "24px 0"}} 
        >

          {/* ========== SIGN UP FORM ========== */}
          {step === 1 && (
            <div 
              className='w-88 bg-transparent border border-[#E7E8EA] flex flex-col items-center justify-center rounded-xl' 
              style={{padding: "16px 24px", boxShadow: "0 0 30px 12px inset rgba(223, 222, 222, 0.6)"}}>
              <div 
                className='bg-[#1A3A5C] w-16 h-12 rounded-[7px] flex items-center justify-center' 
                style={{marginBottom: "14px"}}>
                <p className='text-[1.5rem]'>⚡</p>
              </div>

              <h3 
                className='text-[#0D1B2E] text-[1rem]/[32px] font-bold'>
                  Create a new account
              </h3>

              <p 
                className='text-[#6B7280] text-[0.7rem]/[20px]'>
                  Enter your details to register
              </p>

              <form 
                onSubmit={
                  (e) => {
                    e.preventDefault()

                    setStep(prev => prev + 1)

                    // if(!hasError) {
                    //   setStep(prev => prev + 1)
                    // }
                  }
                }
                action="" 
                className='w-full h-60 flex flex-col' 
                style={{marginTop: "8px"}}>

                <div
                  className='flex flex-col min-h-0 overflow-y-auto no-scrollbar text-[12px]'>
                  {/* ========== NAME FIELD ========== */}
                  <div 
                    style={{ margin: "10px 0"}}>
                    <div 
                      className='flex items-center gap-3 bg-[#FFFFFF] border border-[#E5E7EB] rounded-sm w-full' 
                      style={{padding: "10px"}}>
                      <FaUser className='text-[#6B7280]' />
                      <input
                        value={inputValue.firstName}
                        onChange={(e) => handleChange(e.target)} 
                        onBlur={() => setTouched(prev => ({...prev, firstName: true}))}
                        type="text"
                        name='firstName' 
                        placeholder='First name' 
                        className='w-full bg-[#FFFFFF] outline-none text-[#0D1B2E]' 
                      />
                    </div>
                    
                    { touched.firstName && 
                      errorMsg.firstName && (
                      <div 
                        className=' w-full text-[10px]/[24px] text-[#DC2626] flex items-center gap-1 justify-end'>
                        <MdError className='text-[16px]' />
                        <p>{errorMsg.firstName}</p>
                      </div>
                    ) }
                  </div>

                  <div 
                    style={{ margin: "10px 0"}}>
                    <div 
                      className='flex items-center gap-3 bg-[#FFFFFF] border border-[#E5E7EB] rounded-sm w-full' 
                      style={{padding: "10px"}}>
                      <FaUser className='text-[#6B7280]' />
                      <input
                        value={inputValue.lastName}
                        onChange={(e) => handleChange(e.target)} 
                        onBlur={() => setTouched(prev => ({...prev, lastName: true}))}
                        type="text"
                        name='lastName' 
                        placeholder='Last name' 
                        className='w-full bg-[#FFFFFF] outline-none text-[#0D1B2E]' 
                      />
                    </div>
                    
                    { touched.lastName && 
                      errorMsg.lastName && (
                      <div 
                        className=' w-full text-[10px]/[24px] text-[#DC2626] flex items-center gap-1 justify-end'>
                        <MdError className='text-[16px]' />
                        <p>{errorMsg.lastName}</p>
                      </div>
                    ) }
                  </div>

                  {/* ========== EMAIL FIELD ========== */}
                  <div style={{ margin: "10px 0"}}>
                    <div 
                      className='flex items-center gap-3 bg-[#FFFFFF] border border-[#E5E7EB] rounded-sm w-full' 
                      style={{padding: "10px"}}>
                      <FaEnvelope className='text-[#6B7280]' />
                      <input 
                        value={inputValue.email}
                        onChange={(e) => handleChange(e.target)}
                        onBlur={() => setTouched(prev => ({...prev, email: true}))}
                        type="email" 
                        name='email'
                        placeholder='johndoe@gmail.com' 
                        className='w-full bg-[#FFFFFF] outline-none text-[#0D1B2E]' 
                      />
                    </div>
                    
                    { touched.email &&
                      errorMsg.email && (
                      <div 
                        className='text-[10px]/[24px] text-[#DC2626] flex items-center gap-1 justify-end'>
                        <MdError className='text-[16px]' />
                        <p>{errorMsg.email}</p>
                      </div>
                    )}
                  </div>

                  {/* ========== PHONE FIELD ========== */}
                  <div style={{ margin: "10px 0"}}>
                    <div 
                      className='flex items-center gap-3 bg-[#FFFFFF] border border-[#E5E7EB] rounded-sm w-full' 
                      style={{padding: "10px"}}>
                      <FaPhone className='text-[#6B7280]' />
                      <input 
                        value={inputValue.phoneNumber}
                        onChange={(e) => handleChange(e.target)}
                        onBlur={() => setTouched(prev => ({...prev, phoneNumber: true}))}
                        type="tel" 
                        name='phoneNumber'
                        placeholder='+1 000000000' 
                        className='w-full bg-[#FFFFFF] outline-none text-[#0D1B2E]' 
                      />
                    </div>
                    
                    { touched.phoneNumber &&
                      errorMsg.phoneNumber && (
                      <div 
                        className='text-[10px]/[24px] text-[#DC2626] flex items-center gap-1 justify-end'>
                        <MdError className='text-[16px]' />
                        <p>{errorMsg.phoneNumber}</p>
                      </div>
                    )}
                  </div>

                  {/* ========== ADDRESS FIELD ========== */}
                  <div style={{ margin: "10px 0"}}>
                    <div 
                      className='flex items-center gap-3 bg-[#FFFFFF] border border-[#E5E7EB] rounded-sm w-full' 
                      style={{padding: "10px"}}>
                      <FaMapLocationDot className='text-[#6B7280]' />
                      <input 
                        value={inputValue.address}
                        onChange={(e) => handleChange(e.target)}
                        onBlur={() => setTouched(prev => ({...prev, address: true}))}
                        type="text" 
                        name='address'
                        placeholder='53, Raymond Njoku Str, Ikoyi' 
                        className='w-full bg-[#FFFFFF] outline-none text-[#0D1B2E]' 
                      />
                    </div>
                    
                    { touched.address &&
                      errorMsg.address && (
                      <div 
                        className='text-[10px]/[24px] text-[#DC2626] flex items-center gap-1 justify-end'>
                        <MdError className='text-[16px]' />
                        <p>{errorMsg.address}</p>
                      </div>
                    )}
                  </div>

                  {/* ========== NATIONALITY FIELD ========== */}
                  <div style={{ margin: "10px 0"}}>
                    <div 
                      className='flex items-center gap-3 bg-[#FFFFFF] border border-[#E5E7EB] rounded-sm w-full' 
                      style={{padding: "10px"}}>
                      <BiWorld className='text-[#6B7280] text-xl' />
                      <input 
                        value={inputValue.nationality}
                        onChange={(e) => handleChange(e.target)}
                        onBlur={() => setTouched(prev => ({...prev, nationality: true}))}
                        type="text" 
                        name='nationality'
                        placeholder='Nigerian' 
                        className='w-full bg-[#FFFFFF] outline-none text-[#0D1B2E]' 
                      />
                    </div>
                    
                    { touched.nationality &&
                      errorMsg.nationality && (
                      <div 
                        className='text-[10px]/[24px] text-[#DC2626] flex items-center gap-1 justify-end'>
                        <MdError className='text-[16px]' />
                        <p>{errorMsg.nationality}</p>
                      </div>
                    )}
                  </div>

                  {/* ========== PASSWORD FIELD ========== */}
                  <div style={{ margin: "10px 0"}}>
                    <div 
                      className='flex items-center gap-3 bg-[#FFFFFF] border border-[#E5E7EB] rounded-sm w-full' 
                      style={{padding: "10px"}}>
                      <FaLock className='text-[#6B7280]' />
                      <input
                        value={inputValue.userPassword}
                        onChange={(e) => handleChange(e.target)}
                        onBlur={() => setTouched(prev => ({...prev, userPassword: true}))}
                        type={isViewPassword ? "text" : "password"} 
                        name="userPassword" 
                        placeholder='Enter your password' 
                        className='w-full bg-[#FFFFFF] outline-none text-[#0D1B2E]' 
                      />

                      <div onClick={handleShowPassword}>
                        {isViewPassword ? (
                          <FaEyeSlash className="togPass" />
                        ) : (
                          <FaEye className="togPass" />
                        )}
                      </div>
                    </div>
                    
                    { touched.userPassword &&
                      errorMsg.userPassword && (
                      <div 
                        className='text-[10px]/[24px] text-[#DC2626] flex items-center gap-1 justify-end'>
                        <MdError className='text-[16px]' />
                        <p>{errorMsg.userPassword}</p>
                      </div>
                    )}

                    <p 
                      className='text-[#0D1B2E] text-[10px] text-center'
                      style={{margin: "6px 0"}}>
                        Must contain 1 uppercase letter, 1 number, min. 8 characters
                    </p>
                    
                    <div>
                      <p 
                        className='text-[#0D1B2E] text-[10px]' 
                        style={{marginBottom: "2px"}}>
                          Password Strength
                      </p>
                      <div className='flex items-center gap-1'>
                        <div 
                          className={`w-26 h-2 rounded-md ${inputValue.userPassword && hasUpperCase.test(inputValue.userPassword) 
                          ? "bg-[#27A06E]" 
                          : "bg-[#E5E7EB]"}`} 
                        />
                        <div 
                          className={`w-26 h-2 rounded-md ${inputValue.userPassword && hasNumber.test(inputValue.userPassword) 
                            ? "bg-[#27A06E]" 
                            : "bg-[#E5E7EB]"}`} 
                        />
                        <div 
                          className={`w-26 h-2 rounded-md ${inputValue.userPassword && inputValue.userPassword.length >= 8 
                            ? "bg-[#27A06E]" 
                            : "bg-[#E5E7EB]"}`} 
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <button 
                  type='submit'
                  className={`rounded-lg text-[12px]/[24px] font-bold text-[#FFFFFF] bg-[#a78620]`} 
                  style={{padding: "6px 0", marginTop: "18px", marginBottom: "10px"}}>
                    Next
                </button>
              </form>

              <div className="">
                <span
                  className={`text-[12px]/[24px]`}
                >
                  Have An Account?{" "}
                  <Link to="../Login">
                    <b>Login</b>
                  </Link>
                </span>
              </div>

              <p 
                className='text-[10px]/[20px] text-[#0D1B2E] text-center' 
                style={{marginTop: "4px"}}>
                  By clicking Register, you agree to accept IGNITE X'S Terms and Condition
              </p>
            </div>
          )}


          {/* ========== ENTER BVN / NIN UI ========== */}
          {step === 2 && (
            <div 
              className='w-88 bg-transparent border border-[#E7E8EA] flex flex-col items-center justify-center rounded-xl' 
              style={{padding: "24px", boxShadow: "0 0 30px 12px inset rgba(223, 222, 222, 0.6)"}}>
              <div 
                className='bg-[#E7E8EA] w-12 h-12 rounded-full flex items-center justify-center text-[#6B7280] text-xl' 
                style={{marginBottom: "14px"}}>
                <BsBank className='text-2xl' />
              </div>
              <h2 
                className='text-[#0D1B2E] text-[1rem]/[30px] font-bold text-center' 
                style={{marginBottom: "3px"}}>
                  Please provide your BVN / NIN
              </h2>
              <p 
                className='text-[#6B7280] text-[0.7rem]/[20px]'>
                  Enter BVN & NIN for verification
              </p>

              <form 
                action="" 
                className='flex flex-col gap-3 w-full text-[12px]' 
                style={{marginTop: "16px"}}>
                  <div className='flex flex-col'>
                    <label 
                      htmlFor=""
                      className='text-[#0D1B2E] font-medium'>
                        Enter BVN
                    </label>
                    <input
                      value={inputValue.bvn}
                      onChange={(e) => handleChange(e.target)}
                      type="text" 
                      name='bvn'
                      className='gap-3 bg-[#FFFFFF] border border-[#E5E7EB] rounded-sm w-full cursor-pointer outline-none text-[#0D1B2E]'
                      style={{padding: "10px"}}
                    />
                  </div>
                  <div className='flex flex-col'>
                    <label 
                      htmlFor=""
                      className='text-[#0D1B2E] font-medium'>
                        Enter NIN
                    </label>
                    <input
                      value={inputValue.NInNum}
                      onChange={(e) => handleChange(e.target)}
                      type="text" 
                      name='NInNum'
                      className='gap-3 bg-[#FFFFFF] border border-[#E5E7EB] rounded-sm w-full cursor-pointer outline-none text-[#0D1B2E]'
                      style={{padding: "10px"}}
                    />
                  </div>

                <button 
                  type='button'
                  onClick={
                    (e) => {
                      e.preventDefault();

                      setStep(prev => prev + 1);

                      handleSubmit

                    // if(!hasError) {
                    //   setStep(prev => prev + 1);

                    //   handleSubmit
                    // }
                  }}
                  className='rounded-lg text-[12px]/[24px] font-bold text-[#FFFFFF] bg-[#a78620] cursor-pointer' 
                  style={{padding: "6px 0", marginTop: "18px"}}>
                    Submit
                </button>
              </form>
            </div>
          )}


          {/* ========== SUCCESS REGISTRATION UI ========== */}
          {step === 3 && (
            <div 
              className='w-88 bg-transparent border border-[#E7E8EA] flex flex-col items-center justify-center rounded-xl' 
              style={{padding: "24px", boxShadow: "0 0 30px 12px inset rgba(223, 222, 222, 0.6)"}}>
              <div 
                className='bg-[#DCFCE7] w-13 h-13 rounded-full flex items-center justify-center text-[#10B981] text-2xl' 
                style={{marginBottom: "16px"}}>
                <FaEnvelopeCircleCheck />
              </div>
              <h2 
                className='text-[#0D1B2E] text-[1rem]/[30px] font-bold text-center' 
                style={{marginBottom: "16px"}}>
                  Congratulations! Welcome onboard
              </h2>

              <div className="">
                <span
                  // style={{ color: "rgba(10, 22, 40, 0.8)" }}
                  className={`text-[12px]/[24px]`}
                >
                  Go to login.{" "}
                  <Link to="../Login">
                    <b className='underline'>Login</b>
                  </Link>
                </span>
              </div>
            </div>
          )}
        </section>

        <footer 
          className='flex items-center justify-between bg-[#ffffff]'
          style={{padding: "20px 50px"}}>
          <div className='flex items-center gap-1 text-[#0D1B2E] text-[12px]/[24px]'>
            <FaRegCopyright/>
            <p>2026 IGNITE X BANKING</p>
          </div>

          <div className='flex items-center gap-1 text-[#0D1B2E] text-[12px]/[24px]'>
            <TbWorld className='text-xl' />
            <p>ENG</p>
          </div>
        </footer>
      </div>
    </div>
  )
}

export default Register