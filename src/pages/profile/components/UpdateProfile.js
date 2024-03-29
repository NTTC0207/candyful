import  { useState } from 'react';
import { Button, Modal, Spin, Form, Input, Typography } from 'antd';
import { useNavigate ,Navigate } from 'react-router-dom'
import axios from 'axios';
import { useSelector } from 'react-redux'
axios.defaults.withCredentials = true;

const {Text} =Typography;


const UpdateProfile = ({ profile }) => {

    const navigate= useNavigate();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [spinner, setSpinner] = useState(false)

    const login = useSelector((state) => state.login.login)


  

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };



    const onFinish = (values) => {

        setSpinner(true)

        let Form = new FormData();


        Form.append("Address", values.address)
        Form.append("PhoneNumber", values.phone)

        axios({
            method: "PUT",
            url: process.env.REACT_APP_APIURL + "/api/profile",
            data: Form,
            // headers:{'Content-Type': 'application/json; charset=utf-8'},
            withCredentials: true,

        })
            .then((res) => {
                if (res.status === 200) {
                    navigate("/")
                   
                }
            })
            .catch((err) => {
                setSpinner(false)
              
            })




    };

    const onFinishFailed = (errorInfo) => {
        // console.log('Failed:', errorInfo);
    };
   
    if(login){

        return (
            <>
                <button style={{ background: "#FA7070", color: "white" }} onClick={showModal}>
                    Update
                </button>
    
                <Modal centered open={isModalOpen} onCancel={handleCancel} footer={null}>
                    <Spin spinning={spinner}>
                        <Form
                            layout='vertical'
                            name="basic"
                            initialValues={{ phone: profile.phoneNumber, address: profile.address }}
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                            autoComplete="off">
    
                            <Form.Item
                                label="Phone"
                                name="phone"
                                rules={[{ required: true, message: 'Please input phone number!' }]}>
                                <Input placeholder='Phone number (01XXXXXXXX)' />
                            </Form.Item>
    
                            <Form.Item
                                label="Address"
                                name="address"
                                rules={[{ required: true, message: 'Please input your address!' }]}>
                                <Input.TextArea showCount maxLength={200} rows={3} placeholder="Address " />
                            </Form.Item>
    
    
    
                            <Form.Item style={{ textAlign: "center" }}>
                                <Button type="primary" htmlType="submit" style={{ width: "40%" }}>
                                    Save
                                </Button>
                            </Form.Item>
                            <Text type="secondary">*We will use these information to contact and deliver your order</Text>
                        </Form>
                    </Spin>
                </Modal>
    
            </>
        )
    }else{
        return <Navigate to="/login" />
    }
  
}

export default UpdateProfile;