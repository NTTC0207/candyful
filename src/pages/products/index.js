import {  useEffect } from 'react';
import { Row, Col } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { Card, Skeleton, notification } from 'antd';
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux'
import * as actionCreators from '../Login/store/actionCreators'
axios.defaults.withCredentials = true;

const { Meta } = Card;

const Product = () => {
    //get data
    const dispatch = useDispatch()
    const navi = useNavigate()
    const login = useSelector((state) => state.login.login)
    const product = useSelector((state) => state.login.product)



    useEffect(() => {

        axios({
            method: "GET",
            url: process.env.REACT_APP_APIURL + "/api/publicproduct",
        })
            .then((res) => {
                dispatch(actionCreators.setProduct(res.data))

            })
            .catch((err) => { })

    }, [dispatch])

    const addCart = (id) => {

        axios({
            method: "POST",
            url: process.env.REACT_APP_APIURL + "/api/cart/" + id,
            withCredentials: true,
        }).then((res) => {
            if (res.status === 200) {
                notification["success"]({
                    message: res.data,

                });

                axios({
                    method: 'GET',
                    url: process.env.REACT_APP_APIURL + "/api/cart",
                    withCredentials: true
                })
                    .then((res) => {
                        if (res.data.length === 0 || res.data.length === null) {
                            dispatch(actionCreators.setCart(res.data.length))
                        }

                    })

            }

        }).catch((err) => {

            notification.warning({
                message: err.response.data
            })

        })
    }

    return (
        <>
            <div style={{ width: "100vw", height: "100%" }}>
                <div className="p-title">
                    <h1>Our Product</h1>
                </div>

                <div style={{ width: "100%", display: "flex", justifyContent: "center", marginBottom: "100px" }}>
                    <div className="res-Pro" style={{ background: "white", padding: "40px 40px" }}>
                        <Row justify='start' gutter={[30, 30]}>

                            {

                                product.map((item) => {
                                    return (

                                        <Col lg={8} md={12} sm={24} xs={24} key={item.pid} >
                                            <div className="p-card" >
                                                <Card

                                                    cover={
                                                        <div style={{ overflow: 'hidden', width: "100%", position: 'relative' }}>

                                                            <img
                                                                className="p-img"
                                                                alt="example"
                                                                src={`${process.env.REACT_APP_APIURL}${item.purl}`}
                                                            />
                                                            <Skeleton.Image active={true} style={{ height: "220px", width: "362px" }} />
                                                        </div>
                                                    }
                                                    actions={[
                                                        <>
                                                            {
                                                                login === true ? <ShoppingCartOutlined onClick={() => addCart(item.pid)} key="addCart" /> :
                                                                    <ShoppingCartOutlined onClick={() => { navi("/login") }} key="addCart" />
                                                            }



                                                        </>
                                                    ]}
                                                >
                                                    <Meta

                                                        title={<><span style={{ float: "left" }}>{item.pname}</span><span style={{ float: "right" }}>RM{item.price}/each</span> </>}

                                                        description={item.pdesc}
                                                    />
                                                </Card>
                                            </div>
                                        </Col>

                                    )
                                })
                            }




                        </Row>

                    </div>


                </div>



            </div>
        </>
    )
}

export default Product;