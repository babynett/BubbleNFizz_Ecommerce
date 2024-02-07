import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import CustomTitle from '../../../texts/CustomTitle';
import CustomTextInput from '../../../components/CustomTextInput';
import CustomDatePicker from '../../../components/CustomDatePicker';
import moment from 'moment';
import { Button } from '@mui/material';
import { api } from '../../../config/api';
import swal from 'sweetalert';

const AddCustomer = () => {
    const [name, setName] = useState('')
    const [address, setAddress] = useState('')
    const [birthday, setBirthday] = useState(moment())
    const [city, setCity] = useState('')
    const [postalCode, setPostalCode] = useState('')
    const [contactNo, setContactNo] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confPassword, setConfPassword] = useState('')

    const submit = () => {
        if (name == '' || address == "" || city == "" || postalCode == "" || contactNo == "" || email == "" || password == "" || confPassword == "") {
            swal({
                icon: "error",
                title: "Error!",
                text: "Please complete the form!"
            })
        } else if (password !== confPassword) {
            swal({
                icon: "error",
                title: "Password does not match!",
                text: "The passwords does not match!"
            })
        } else {
            api.post('usermanagement/addcustomer', {
                name: name,
                address: address,
                birthday: moment(birthday).format("YYYY-MM-DD"),
                city: city,
                postal_code: postalCode,
                contact_number: contactNo,
                email: email,
                password: password
            }).then((response) => {
                swal({
                    icon: 'success',
                    title: 'Customer Added!',
                    text: "Customer has been added!"
                }).then((response) => {
                    setName("")
                    setAddress("")
                    setBirthday(moment())
                    setCity("")
                    setPostalCode("")
                    setContactNo("")
                    setEmail("")
                    setPassword("")
                    setConfPassword("")
                })
            }).catch(err => {
                swal({
                    icon: "error",
                    title: "Email already used!",
                    text: "The email has already been used!"
                })
                console.error(err.response)
            })
        }
    }

    return (
        <div className="w-full">
            <CustomTitle text={`Customer Details`} />
            <CustomTextInput 
                my={6}
                value={name}
                onChangeValue={e => setName(e.target.value)}
                label={`Customer Name`}
            />
            <CustomDatePicker 
                label={`Customer Birthday`}
                value={birthday}
                onChangeValue={(value) => setBirthday(value)}
                my={6}
            />
            <CustomTextInput 
                my={6}
                value={address}
                onChangeValue={e => setAddress(e.target.value)}
                label={`Address`}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <CustomTextInput 
                    my={6}
                    value={city}
                    onChangeValue={e => setCity(e.target.value)}
                    label={`City`}
                />
                <CustomTextInput 
                    my={6}
                    value={postalCode}
                    onChangeValue={e => setPostalCode(e.target.value)}
                    label={`Postal Code`}
                />
            </div>
            <CustomTextInput 
                my={6}
                value={contactNo}
                onChangeValue={e => setContactNo(e.target.value)}
                label={`Contact Number`}
                restrictions={`numeric`}
            />
            <CustomTextInput 
                my={6}
                value={email}
                onChangeValue={e => setEmail(e.target.value)}
                label={`Email`}
                type={`email`}
            />
            <CustomTextInput 
                my={6}
                value={password}
                onChangeValue={e => setPassword(e.target.value)}
                label={`Password`}
                type={`password`}
            />
            <CustomTextInput 
                my={6}
                value={confPassword}
                onChangeValue={e => setConfPassword(e.target.value)}
                label={`Confirm Password`}
                type={`password`}
            />
            <div className="flex justify-center items-center w-full my-3">
                <Button variant="contained" fullWidth onClick={submit} sx={{ backgroundColor:"#B75800", fontWeight: 700 }}>
                    Submit
                </Button>
            </div>
        </div>
    );
}

export default AddCustomer;

if (document.getElementById('AddCustomer')) {
    ReactDOM.render(<AddCustomer />, document.getElementById('AddCustomer'))
}