import React from 'react'
import './sign-up-styles.scss'

import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";
import { auth, createUserProfileDocument} from "../../firebase/firebase.utils";

class SignUp extends React.Component {
  constructor() {
    super();
    this.state = {
      displayName: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
  }

  handleSubmit = async e => {
    e.preventDefault()
    const {displayName, email, password, confirmPassword } = this.state
    if (password !== confirmPassword) {
      alert(`password don't match`)
      return
    }

    try {
      const {user} = await auth.createUserWithEmailAndPassword(email, password)
      await createUserProfileDocument(user, {displayName})

      this.setState({
        displayName: '',
        email: '',
        password: '',
        confirmPassword: ''
      })
    }catch (err) {
      console.error(err)
    }
  }

  handleChange = e => {
    const { name, value } = e.target
    this.setState({
      [name]: value
    })
  }

  render() {
    const {displayName, email, password, confirmPassword} = this.state
    return (
      <div className='sign-up'>
        <h2 className='title'>I do not have a account</h2>
        <span> Sign up with your email and password </span>
        <form className='sign-up-form' onSubmit={this.handleSubmit}>
          <FormInput
          type='text'
          name='displayName'
          value={displayName}
          onChange={this.handleChange}
          label='Display Name'
          required
          />
          <FormInput
            type='text'
            name='email'
            value={email}
            onChange={this.handleChange}
            label='email'
            required
          />
          <FormInput
            type='password'
            name='password'
            value={password}
            onChange={this.handleChange}
            label='password'
            required
          />
          <FormInput
            type='password'
            name='confirmPassword'
            value={confirmPassword}
            onChange={this.handleChange}
            label='confirmPassword'
            required
          />
          <CustomButton type='submit'> SIGN UP </CustomButton>
        </form>
      </div>
    )
  }
}


export default SignUp