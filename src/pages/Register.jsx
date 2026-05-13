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
import { useState, useEffect } from 'react'
import axios from 'axios'
import Select from 'react-select'
import { Link } from "react-router-dom";
import API from '../services/api'
import { registerUser } from '../services/authService'
import { toast } from "react-toastify";


function Register() {

  const [step, setStep] = useState(1)
  // const [firstName, setFirstName] = useState(null)
  // const [lastName, setLastName] = useState(null)
  // const [email, setEmail] = useState(null)
  // const [phone, setPhone] = useState(null)
  // const [address, setAddress] = useState(null)
  // const [country, setCountry] = useState(null)
  // const [nextOfKin, setnextOfKin] = useState(null)
  // const [password, setPassword] = useState(null)
  // const [bvn, setBvn] = useState(null)
  // const [nin, setNin] = useState(null)
  // const [pin, setPin] = useState(null)
  const [piN, setPiN] = useState(["", "", "", ""]);
  const [inputValue, setInputValue] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    bvn: undefined,
    userPassword: "",
    accountType: "",
    nationality: "",
    NInNum: "",
    address: "",
    pin: "",
    nextOfKin: ""
  })
  const [touched, setTouched] = useState({
    firstName: false,
    lastName: false,
    email: false,
    phoneNumber: false,
    bvn: false,
    userPassword: false,
    accountType: false,
    nationality: false,
    NInNum: false,
    address: false,
    pin: false,
    nextOfKin: false
  })
  const [errorMsg, setErrorMsg] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    bvn: "",
    userPassword: "",
    accountType: "",
    nationality: "",
    NInNum: "",
    address: "",
    pin: "",
    nextOfKin: ""
  })

  // INPUT CHANGE FUNCTION

  const handlePinChange = (e, index) => {
    const value = e.target.value;

    const newPin = [...piN]
    newPin[index] = value

    setPiN(newPin);

    setInputValue((prev) => ({
      ...prev,
      pin: newPin.join("")
    }))
  }

  const handleChange = (input) => {
    setInputValue((prev) => ({
      ...prev,
      [input.name]: input.value
    }))
  }

  // const showPassword = (password) => {
  //   password.type === "text"
  // }

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

      // NEXT OF KIN VALIDATION
      inputValue.nextOfKin.trim() === "" 
        ? setErrorMsg((prev) => ({
            ...prev,
            nextOfKin: "This field is required"})
          )
        : setErrorMsg((prev) => ({
            ...prev,
            nextOfKin: ""})
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
            nationality: "This field is required"})
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await registerUser(inputValue);

      console.log(data);

      toast.success("You have successfully created an acccout");
      setStep((prev) => prev + 1);
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <div 
      className='min-h-screen max-w-360 flex items-start justify-center bg-[#f5f7f9]' style={{padding: "0 50px 0 50px"}}>
      <div 
        className='w-330 min-h-screen flex flex-col justify-between' style={{margin: "20px 0"}}>
        <header 
          className='flex items-center justify-between'>
          <div 
            className='bg-[#1A3A5C] w-8 h-8 rounded-sm flex items-center justify-center'>
            <p>⚡</p>
          </div>

          <div 
            className='flex items-center gap-6 font-normal text-[16px] text-[#0D1B2E]'>
            <div 
              className='flex items-center gap-1 rounded-full bg-[#FFFFFF] border border-[#0D1B2E]' 
              style={{padding: "1px 8px 1px 2px"}}>
              <FaCircleCheck 
                className='border border-[#E7E8EA] rounded-full text-[20px] text-[#27A06E]' 
                style={{padding: "2px"}} 
              />
              <p>1. Email</p>
            </div>

            <div 
              className={`flex items-center gap-1 rounded-full bg-[#FFFFFF] border 
              ${step >= 2 
                ? "border-[#0D1B2E]" 
                : "border-[#E7E8EA]"}`} 
              style={{padding: "1px 8px 1px 2px"}}>
              
              {step >= 2
                ? <FaCircleCheck 
                    className='border border-[#E7E8EA] rounded-full text-[20px] text-[#27A06E]' 
                    style={{padding: "2px"}} 
                  />
                : <FaRegUserCircle 
                    className='border border-[#E7E8EA] rounded-full text-[20px] text-[#0D1B2E]' 
                    style={{padding: "2px"}} 
                  />
              }
              <p>2. Account Type</p>
            </div>

            <div 
              className={`flex items-center gap-1  rounded-full bg-[#FFFFFF] border 
              ${step >= 3 
                ? "border-[#0D1B2E]" 
                : "border-[#E7E8EA]"}`} 
              style={{padding: "1px 8px 1px 2px"}}>
              
              {step >= 3
                ? <FaCircleCheck 
                    className='border border-[#E7E8EA] rounded-full text-[20px] text-[#27A06E]' 
                    style={{padding: "2px"}} 
                  />
                : <FaRegFlag 
                    className='border border-[#E7E8EA] rounded-full text-[20px] text-[#0D1B2E]' 
                    style={{padding: "2px"}} 
                  />
                }
              <p>3. BVN / NIN</p>
            </div>

            <div 
              className={`flex items-center gap-1  rounded-full bg-[#FFFFFF] border 
              ${step >= 4 
                ? "border-[#0D1B2E]" 
                : "border-[#E7E8EA]"}`} 
              style={{padding: "1px 8px 1px 2px"}}>

              {step >= 4
                ? <FaCircleCheck 
                    className='border border-[#E7E8EA] rounded-full text-[20px] text-[#27A06E]' 
                    style={{padding: "2px"}} 
                  />
                : <RiPhoneLockLine 
                    className='border border-[#E7E8EA] rounded-full text-[20px] text-[#0D1B2E]' 
                    style={{padding: "2px"}} 
                  />
                }
              <p>4. 2FA</p>
            </div>

            <div 
              className={`flex items-center gap-1  rounded-full bg-[#FFFFFF] border 
              ${step >= 6 
                ? "border-[#0D1B2E]" 
                : "border-[#E7E8EA]"}`} 
              style={{padding: "1px 8px 1px 2px"}}>

              {step >= 6
                ? <FaCircleCheck 
                    className='border border-[#E7E8EA] rounded-full text-[20px] text-[#27A06E]' 
                    style={{padding: "2px"}} 
                  />
                : <RiPhoneLockLine 
                    className='border border-[#E7E8EA] rounded-full text-[20px] text-[#0D1B2E]' 
                    style={{padding: "2px"}} 
                  />
                }
              <p>5. Create PIN</p>
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
          style={{margin: "30px 0"}}>

          {/* ========== SIGN UP FORM ========== */}
          {step === 1 && (
            <div 
              className='w-md min-h-125 bg-[#FFFFFF] border border-[#E7E8EA] shadow-md flex flex-col items-center justify-center rounded-xl' 
              style={{padding: "24px"}}>
              <div 
                className='bg-[#1A3A5C] w-20 h-16 rounded-[20px] flex items-center justify-center' 
                style={{marginBottom: "14px"}}>
                <p>⚡</p>
              </div>

              <h2 
                className='text-[#0D1B2E] text-[24px]/[32px] font-bold'>
                  Create a new account
              </h2>

              <p 
                className='text-[#6B7280] text-[14px]/[20px]'>
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
                className='flex flex-col' 
                style={{marginTop: "14px"}}>

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
                      placeholder='Enter first name' 
                      className='w-full bg-[#FFFFFF] outline-none text-[#0D1B2E]' 
                    />
                  </div>
                  
                  { touched.firstName && 
                    errorMsg.firstName && (
                    <div 
                      className=' w-full text-[14px]/[24px] text-[#DC2626] flex items-center gap-1 justify-end'>
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
                      placeholder='Enter last name' 
                      className='w-full bg-[#FFFFFF] outline-none text-[#0D1B2E]' 
                    />
                  </div>
                  
                  { touched.lastName && 
                    errorMsg.lastName && (
                    <div 
                      className=' w-full text-[14px]/[24px] text-[#DC2626] flex items-center gap-1 justify-end'>
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
                      className='text-[14px]/[24px] text-[#DC2626] flex items-center gap-1 justify-end'>
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
                      className='text-[14px]/[24px] text-[#DC2626] flex items-center gap-1 justify-end'>
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
                      className='text-[14px]/[24px] text-[#DC2626] flex items-center gap-1 justify-end'>
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
                      className='text-[14px]/[24px] text-[#DC2626] flex items-center gap-1 justify-end'>
                      <MdError className='text-[16px]' />
                      <p>{errorMsg.nationality}</p>
                    </div>
                  )}
                </div>

                {/* ========== NEXT OF KIN FIELD ========== */}
                <div style={{ margin: "10px 0"}}>
                  <div 
                    className='flex items-center gap-3 bg-[#FFFFFF] border border-[#E5E7EB] rounded-sm w-full' 
                    style={{padding: "10px"}}>
                    <FaUser className='text-[#6B7280]' />
                    <input 
                      value={inputValue.nextOfKin}
                      onChange={(e) => handleChange(e.target)}
                      onBlur={() => setTouched(prev => ({...prev, nextOfKin: true}))}
                      type="text" 
                      name='nextOfKin'
                      placeholder='sarah martins' 
                      className='w-full bg-[#FFFFFF] outline-none text-[#0D1B2E]' 
                    />
                  </div>
                  
                  { touched.nextOfKin &&
                    errorMsg.nextOfKin && (
                    <div 
                      className='text-[14px]/[24px] text-[#DC2626] flex items-center gap-1 justify-end'>
                      <MdError className='text-[16px]' />
                      <p>{errorMsg.nextOfKin}</p>
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
                      type="password" 
                      name="userPassword" 
                      placeholder='Enter your password' 
                      className='w-full bg-[#FFFFFF] outline-none text-[#0D1B2E]' 
                    />
                    <FaEye 
                      className='text-[#6B7280] text-xl' />
                  </div>
                  
                  { touched.userPassword &&
                    errorMsg.userPassword && (
                    <div 
                      className='text-[14px]/[24px] text-[#DC2626] flex items-center gap-1 justify-end'>
                      <MdError className='text-[16px]' />
                      <p>{errorMsg.userPassword}</p>
                    </div>
                  )}
                </div>

                <p 
                  className='text-[12px]/[24px] text-[#0D1B2E]'>
                    Must contain 1 uppercase letter, 1 number, min. 8 characters
                </p>
                
                <div>
                  <p 
                    className='text-[12px]/[24px] text-[#0D1B2E]' 
                    style={{marginBottom: "2px", marginTop: "8px"}}>
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

                <button 
                  type='submit'
                  className={`rounded-lg text-[14px]/[24px] font-bold text-[#FFFFFF] bg-[#C9A227]`} 
                  style={{padding: "6px 0", marginTop: "18px", marginBottom: "10px"}}>
                    Sign Up
                </button>
              </form>

              <div className="">
                <span
                  // style={{ color: "rgba(10, 22, 40, 0.8)" }}
                  className={`text-[14px]/[24px]`}
                >
                  Have An Account?{" "}
                  <Link to="../Login">
                    <b>Login</b>
                  </Link>
                </span>
              </div>

              <p 
                className='text-[12px]/[20px] text-[#0D1B2E] text-center' 
                style={{marginTop: "20px"}}>
                  By clicking Register, you agree to accept IGNITE X'S Terms and Condition
              </p>
            </div>
          )}


          {/* ========== CHOOSE ACCOUNT TYPE UI ========== */}
          {step === 2 && (
            <div 
              className='w-md min-h-115 bg-[#FFFFFF] border border-[#E7E8EA] shadow-md flex flex-col items-center justify-center rounded-xl' 
              style={{padding: "24px"}}>
              <div 
                className='bg-[#E7E8EA] w-16 h-16 rounded-full flex items-center justify-center text-[#6B7280] text-xl' 
                style={{marginBottom: "14px"}}>
                <FaUser />
              </div>

              <h2 
                className='text-[#0D1B2E] text-[24px]/[30px] font-bold text-center' 
                style={{marginBottom: "3px"}}>
                  What kind of account would you open today?
              </h2>
              <p 
                className='text-[#6B7280] text-[14px]/[20px]'>
                  You can add another account later on , too.
              </p>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setStep(prev => prev + 1)
                }}
                action="" 
                className='flex flex-col w-full' 
                style={{marginTop: "14px"}}>

                <div 
                  onClick={() => setInputValue((prev) => ({
                    ...prev,
                    accountType: "Savings"
                  }))}
                  className='flex items-center justify-between gap-3 bg-[#FFFFFF] border border-[#E5E7EB] rounded-sm w-full cursor-pointer' 
                  style={{padding: "10px", margin: "10px 0"}}>
                  <div className='flex items-center gap-3'>

                    <div 
                      className='bg-[#E7E8EA] w-10 h-10 flex items-center justify-center rounded-lg'>
                      <FaUser className='text-[#6B7280]' />
                    </div>
                    
                    <div>
                      <p 
                        className='font-semibold text-[14px]/[24px] text-[#0D1B2E]'>
                          Savings Account
                      </p>
                      <p 
                        className='font-normal text-[12px]/[20px] text-[#6B7280]'>
                          For individuals use
                      </p>
                    </div>

                  </div>
                  <input 
                    type="radio"
                    name='accountType'
                    checked={inputValue.accountType === "Savings"} 
                    readOnly
                    className='w-5 h-5 accent-[#0D1B2E]' 
                  />
                </div>

                <div
                  onClick={() => setInputValue((prev) => ({
                    ...prev,
                    accountType: "Current"
                  }))}
                  className='flex items-center justify-between gap-3 bg-[#FFFFFF] border border-[#E5E7EB] rounded-sm w-full cursor-pointer' 
                  style={{padding: "10px", margin: "10px 0"}}>
                  <div className='flex items-center gap-3'>

                    <div 
                      className='bg-[#E7E8EA] w-10 h-10 flex items-center justify-center rounded-lg'>
                      <FaEnvelope className='bg-[#E7E8EA] text-[#6B7280]' />
                    </div>

                      <div>

                        <p 
                          className='font-semibold text-[14px]/[24px] text-[#0D1B2E]'>
                            Current Account
                        </p>
                        <p 
                          className='font-normal text-[12px]/[20px] text-[#6B7280]'>
                            For company use
                        </p>

                      </div>

                    </div>
                  <input 
                    type="radio"
                    name='accountType'
                    checked={inputValue.accountType === "Current"}
                    readOnly
                    className='w-5 h-5 accent-[#0D1B2E]' 
                  />
                </div>

                <button
                  type='submit'
                  className='rounded-lg text-[14px]/[24px] font-bold text-[#FFFFFF] bg-[#C9A227] cursor-pointer' 
                  style={{padding: "6px 0", marginTop: "18px"}}>
                    Continue
                </button>
              </form>
            </div>
          )}


          {/* ========== ENTER BVN / NIN UI ========== */}
          {step === 3 && (
            <div 
              className='w-md min-h-80 bg-[#FFFFFF] border border-[#E7E8EA] shadow-md flex flex-col items-center justify-center rounded-xl' 
              style={{padding: "24px"}}>
              <div 
                className='bg-[#E7E8EA] w-16 h-16 rounded-full flex items-center justify-center text-[#6B7280] text-xl' 
                style={{marginBottom: "14px"}}>
                <BsBank className='text-2xl' />
              </div>
              <h2 
                className='text-[#0D1B2E] text-[24px]/[30px] font-bold text-center' 
                style={{marginBottom: "3px"}}>
                  Please provide your BVN / NIN
              </h2>
              <p 
                className='text-[#6B7280] text-[14px]/[20px]'>
                  Enter BVN & NIN for verification
              </p>

              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  setStep(prev => prev + 1);
                }}
                action="" 
                className='flex flex-col gap-3 w-full' 
                style={{marginTop: "24px"}}>
                  <div className='flex flex-col'>
                    <label 
                      htmlFor=""
                      className='text-[#0D1B2E] text-[14px]/[20px] font-medium'>
                        Enter BVN
                    </label>
                    <input
                      value={inputValue.bvn}
                      onChange={(e) => handleChange(e.target)}
                      type="text" 
                      name='bvn'
                      className='gap-3 bg-[#FFFFFF] border border-[#E5E7EB] rounded-sm w-full cursor-pointer outline-none text-[#0D1B2E] text-[16px]/[20px]'
                      style={{padding: "10px"}}
                    />
                  </div>
                  <div className='flex flex-col'>
                    <label 
                      htmlFor=""
                      className='text-[#0D1B2E] text-[14px]/[20px] font-medium'>
                        Enter NIN
                    </label>
                    <input
                      value={inputValue.NInNum}
                      onChange={(e) => handleChange(e.target)}
                      type="text" 
                      name='NInNum'
                      className='gap-3 bg-[#FFFFFF] border border-[#E5E7EB] rounded-sm w-full cursor-pointer outline-none text-[#0D1B2E] text-[16px]/[20px]'
                      style={{padding: "10px"}}
                    />
                  </div>

                <button 
                  type='submit'
                  className='rounded-lg text-[14px]/[24px] font-bold text-[#FFFFFF] bg-[#C9A227] cursor-pointer' 
                  style={{padding: "6px 0", marginTop: "18px"}}>
                    Continue
                </button>
              </form>
            </div>
          )}


          {/* ========== VERIFY EMAIL UI ========== */}
          {step === 4 && (
            <div 
              className='w-md min-h-80 bg-[#FFFFFF] border border-[#E7E8EA] shadow-md flex flex-col items-center justify-center rounded-xl' 
              style={{padding: "24px"}}>
              <div 
                className='bg-[#E7E8EA] w-16 h-16 rounded-full flex items-center justify-center text-[#6B7280] text-xl' 
                style={{marginBottom: "14px"}}>
                <MdOutlineAlternateEmail className='text-2xl' />
              </div>
              <h2 
                className='text-[#0D1B2E] text-[24px]/[30px] font-bold text-center' 
                style={{marginBottom: "3px"}}>
                  Verify your email with a code
              </h2>
              <p 
                className='text-[#6B7280] text-[14px]/[20px]'>
                  It helps keep your account secure.
              </p>

              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  setStep(prev => prev + 1)}}
                action="" 
                className='flex flex-col w-full' 
                style={{marginTop: "24px"}}>
                <p 
                  className='text-[#0D1B2E] text-[14px]/[20px] font-medium' 
                  style={{marginBottom: "4px"}}>
                    Enter your email
                </p>
                <div 
                  className='flex items-center justify-between gap-3 bg-[#FFFFFF] border border-[#E5E7EB] rounded-sm w-full cursor-pointer' 
                  style={{padding: "10px"}}>
                  <input 
                    className='w-full outline-none text-[#0D1B2E]' 
                    type="email" 
                  />
                </div>

                <button
                  type='submit'
                  className='rounded-lg text-[14px]/[24px] font-bold text-[#FFFFFF] bg-[#C9A227] cursor-pointer' 
                  style={{padding: "6px 0", marginTop: "18px"}}>
                    Continue
                </button>
              </form>
            </div>
          )}


          {/* ========== ENTER CODE DIGITS UI ========== */}
          {step === 5 && (
            <div 
              className='w-md min-h-80 bg-[#FFFFFF] border border-[#E7E8EA] shadow-md flex flex-col items-center justify-center rounded-xl' 
              style={{padding: "24px"}}>
              <div 
                className='bg-[#E7E8EA] w-16 h-16 rounded-full flex items-center justify-center text-[#6B7280] text-xl' 
                style={{marginBottom: "14px"}}>
                <MdContactPhone />
              </div>
              <h2 
                className='text-[#0D1B2E] text-[24px]/[30px] font-bold text-center' 
                style={{marginBottom: "3px"}}>
                  Enter 6 digit code
              </h2>
              <p 
                className='text-[#6B7280] text-[14px]/[20px]'>
                  We sent it to johndoe@gmail.com. 
                  <span 
                    className='font-normal text-[14px]/[24px] text-[#3A8FD4] underline'>
                      Change
                  </span>
              </p>

              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  setStep(prev => prev + 1)
                }}
                action="" 
                className='flex flex-col w-full' 
                style={{marginTop: "24px"}}>
                <p 
                  className='text-[#0D1B2E] text-[14px]/[20px] font-medium' 
                  style={{marginBottom: "6px"}}>
                    Enter Code
                </p>
                <div 
                  className='flex justify-between gap-3 w-full cursor-pointer font-semibold'>
                  <input 
                    className='bg-[#FFFFFF] border border-[#E5E7EB] rounded-sm w-15 h-15 outline-none text-[#0D1B2E] text-center' maxLength={1} 
                  />
                  <input 
                    className='bg-[#FFFFFF] border border-[#E5E7EB] rounded-sm w-15 h-15 outline-none text-[#0D1B2E] text-center' maxLength={1} 
                  />
                  <input 
                    className='bg-[#FFFFFF] border border-[#E5E7EB] rounded-sm w-15 h-15 outline-none text-[#0D1B2E] text-center' maxLength={1} 
                  />
                  <input 
                    className='bg-[#FFFFFF] border border-[#E5E7EB] rounded-sm w-15 h-15 outline-none text-[#0D1B2E] text-center' maxLength={1} 
                  />
                  <input 
                    className='bg-[#FFFFFF] border border-[#E5E7EB] rounded-sm w-15 h-15 outline-none text-[#0D1B2E] text-center' maxLength={1} 
                  />
                  <input 
                    className='bg-[#FFFFFF] border border-[#E5E7EB] rounded-sm w-15 h-15 outline-none text-[#0D1B2E] text-center' maxLength={1} 
                  />
                </div>

                <button 
                  type='submit'
                  className='rounded-lg text-[14px]/[24px] font-bold text-[#FFFFFF] bg-[#C9A227] cursor-pointer' 
                  style={{padding: "6px 0", margin: "18px 0"}}>
                    Continue
                </button>
              </form>
              
              <p 
                className='text-[12px]/[20px] text-[#3A8FD4] underline'>
                  Didn't receive a code?
              </p>
            </div>
          )}



          {/* ========== CREATE PIN UI ========== */}
          {step === 6 && (
            <div 
              className='w-md min-h-80 bg-[#FFFFFF] border border-[#E7E8EA] shadow-md flex flex-col items-center justify-center rounded-xl' 
              style={{padding: "24px"}}>
              <div 
                className='bg-[#E7E8EA] w-16 h-16 rounded-full flex items-center justify-center text-[#6B7280] text-xl' 
                style={{marginBottom: "14px"}}>
                <MdPassword className='text-2xl' />
              </div>
              <h2 
                className='text-[#0D1B2E] text-[24px]/[30px] font-bold text-center' 
                style={{marginBottom: "3px"}}>
                  Create a Transaction PIN
              </h2>
              <p 
                className='text-[#6B7280] text-[14px]/[20px]'>
                Make your transactions secure.
              </p>

              <form 
                onSubmit={handleSubmit}
                className='flex flex-col w-full' 
                style={{marginTop: "24px", padding:"0 20px"}}>
                <p 
                  className='text-[#0D1B2E] text-[14px]/[20px] font-medium' 
                  style={{marginBottom: "7px"}}>
                    Enter PIN
                </p>
                <div 
                  className='flex justify-between gap-3 w-full cursor-pointer font-semibold text-2xl'>
                  {piN.map((value, index) => (
                    <input
                      key={index}
                      value={piN[index] || ""}
                      onChange={(e) => handlePinChange(e, index)}
                      maxLength={1}
                      className="bg-[#FFFFFF] border border-[#E5E7EB] rounded-sm w-15 h-15 outline-none text-[#0D1B2E] text-center"
                    />
                  ))}
                </div>

                <button 
                  type='submit'
                  className='rounded-lg text-[14px]/[24px] font-bold text-[#FFFFFF] bg-[#C9A227] cursor-pointer' 
                  style={{padding: "6px 0", margin: "18px 0"}}>
                    Submit
                </button>
              </form>
            </div>
          )}


          {/* ========== SUCCESS REGISTRATION UI ========== */}
          {step === 7 && (
            <div 
              className='w-md min-h-80 bg-[#FFFFFF] border border-[#E7E8EA] shadow-md flex flex-col items-center justify-center rounded-xl' 
              style={{padding: "24px"}}>
              <div 
                className='bg-[#DCFCE7] w-16 h-16 rounded-full flex items-center justify-center text-[#10B981] text-2xl' 
                style={{marginBottom: "16px"}}>
                <FaEnvelopeCircleCheck />
              </div>
              <h2 
                className='text-[#0D1B2E] text-[24px]/[30px] font-bold text-center' 
                style={{marginBottom: "16px"}}>
                  To login, check your email
              </h2>
              <p 
                className='text-[#6B7280] text-[14px]/[20px] text-center' 
                style={{marginBottom: "10px"}}>
                  For security, we've sent you an email to nunzserigala@gmail.com. Simply click the link in the email and you'll be set
              </p>

              <button 
                className='rounded-lg text-[14px]/[24px] font-bold text-[#FFFFFF] bg-[#C9A227] cursor-pointer w-full' 
                style={{padding: "6px 0", marginTop: "18px"}}>
                  Send it again
              </button>
            </div>
          )}
        </section>

        <footer className='flex items-center justify-between'>
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