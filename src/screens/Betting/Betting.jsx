import React, { useRef, useState,useEffect } from "react";
import { Card, Container, Row, Form, Col, Button } from "react-bootstrap";
import Modal from 'react-modal';
import { toast } from 'react-toastify';

import { contract, abi, tokenAddress, tokeAbi } from '../../utilies/constant'
import Web3 from 'web3'
import { loadWeb3 } from '../../apis/api'
import Spinner from "../../Components/Spinner_here/Spinner";
function Betting({ Card_props,setCard_props}) {



    let getdata = useRef()
    const [buttonState, setButtonState] = useState(false)
    const [InputData, setInputData] = useState("")
    const [value, setValue] = useState("")
    const [mybalance, setMybalance] = useState("")
    let [IsLoading, setIsLoading] = useState(false)



    let bet_getdata 

    const Bet_Amount = async () => {
        try {
            let acc = await loadWeb3();
             bet_getdata = getdata.current.value;
            // getdata=parseInt(getdata)
            

            if (acc === "No Wallet") {
                console.error("Not Connected to Wallet")

            }
            else if (acc === "Wrong Network") {
                console.error("Wrong Newtwork please connect to test net")
            }

            else {


                const web3 = window.web3;
                let tokenapp = new web3.eth.Contract(tokeAbi, tokenAddress)
                let contractAcc = new web3.eth.Contract(abi, contract)

                if (bet_getdata >= 1 && bet_getdata <= 40000) {


                    setIsLoading(true)
                    await tokenapp.methods.approve(contract, web3.utils.toWei(bet_getdata)).send({
                        from: acc
                    })

                    toast.success("Token Approve Successful.");


                    await contractAcc.methods.Bet_Amount(web3.utils.toWei(bet_getdata)).send({
                        from: acc
                    })
                  
                    bet_getdata = getdata.current.value=""
                    setIsLoading(false)
                    toast.success("Bet Successful");

                }
                else {
                    toast.error("Invalid Amount");
                }





            }
        } catch (error) {
            bet_getdata = getdata.current.value=""
            setIsLoading(false)

            console.log("Error while Bet Amount ", error);



        }



    }



    const withdraw = async () => {
        try {
            let acc = await loadWeb3();



            if (acc === "No Wallet") {
                toast.error("Not Connected to Wallet")

            }
            else if (acc === "Wrong Network") {
                toast.error("Wrong Newtwork please connect to test net")
            }
      

            else {
             


                const web3 = window.web3;
                let tokenapp = new web3.eth.Contract(tokeAbi, tokenAddress)
                let contractAcc = new web3.eth.Contract(abi, contract)

                bet_getdata = getdata.current.value=""

                if (Card_props.length == 0){

                    toast.error("Plese Select Card");
                } else {
                   setIsLoading(true)

                await contractAcc.methods.withdraw(Card_props).send({
                    from: acc
                })
                toast.success("Withdraw Successful");
                setIsLoading(false)
                setCard_props(0)
                   
                }
            }
        } catch (error) {
            bet_getdata = getdata.current.value=""
            setIsLoading(false)
            console.log("Error while not withdraw ", error);



        }



    }
    const balanceOf = async () => {
        let acc = await loadWeb3();
        const web3 = window.web3;
        let tokenBalane = new web3.eth.Contract(tokeAbi, tokenAddress)
        let Balance_here = await tokenBalane.methods.balanceOf(acc).call();
        tokenBalane = web3.utils.fromWei(Balance_here);
        
        setMybalance(parseInt(tokenBalane) )


    }



useEffect(() => {
    balanceOf()
}, [1000])










    return (

        <section class="how-section padding-top padding-bottom bg_img bg_img2">
            {
                IsLoading && <Spinner />
            }
            <div class="container">
                <div class="profile-edit-wrapper">
                    <div class="row gy-5">

                        <div class="col-xl-5">
                            <h2 class="section-header__title" style={{ fontSize: "19px" }}>CHOOSE BETTING AMOUNT IN WHE COIN</h2>
                            <div class="custom--card card--lg">
                                <div class="card--body">
                                    <div class="row gy-3">
                                        <div class="main">
                                            <div class="form-group">
                                                <label for="fname" class="form-label top">My Wallet</label>

                                            </div>
                                            <div class="form-group center">
                                                <label for="lname" class="form-label top">WHE Coin</label>

                                            </div>

                                            <div class="form-group center spiner1" id="myBtn" style={{ width: "auto" }}>
                                                <img src="/spinersmall.png" />

                                            </div>
                                        </div>


                                        <div class="main">
                                            <div class="form-group">
                                                <label for="zip" class="form-label"  >Bet Amount</label>

                                            </div>
                                            <div class="form-group1" style={{ width: "30%" }}>

                                                <input id="zip" type="number"
                                                    ref={getdata}
                                                    class="form-control form--control style-two " placeholder="" />

                                            </div>

                                            <div class="form-group center">
                                                <label class="form-label" for="about">WHE Coin</label><br />
                                                <label class="form-label " style={{fontWeight:'700'}}  for="about">{mybalance}</label>

                                            </div>
                                        </div>

                                        <div class="col-md-12">
                                            <div class="form-group">
                                                <label class="form-label" for="about">*Min bet 1 Coin, Max bet 40,000 Coin </label>

                                            </div>
                                        </div>

                                        <div class="col-md-6">
                                            <button class="cmn--btn active mt-3" onClick={() => Bet_Amount()}>Bet Now!</button>
                                        </div>
                                        <div class="col-md-6">
                                            <button class="cmn--btn active mt-3" onClick={() => withdraw()} >Withdrawal</button>
                                        </div>

                                    </div>
                                </div>

                            </div>
                        </div>

                        <div class="col-xl-7">
                            <div class="section-header text-center">
                                <h2 class="section-header__title" style={{ fontSize: "19px" }}>IF YOU BET 100 WHE COIN (MIN BET 1, MAX BET 40,000)</h2>

                                <div class="table-responsive-md border" style={{ overflow: "auto" }}>
                                    <table class="table">
                                        <thead>
                                            <tr className="textCaps">
                                                <th style={{ borderTopLeftRadius: "13px" }}>Type</th>
                                                <th>Bet</th>
                                                <th>Reward</th>
                                                <th>Payout</th>
                                                <th style={{ borderTopRightRadius: "13px" }}>Profit</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td class="trx-id">Level 1 (HANGED)</td>
                                                <td class="trx-type" data-label="Transection Type">100</td>
                                                <td class="date">50</td>
                                                <td class="amount">x0.5</td>
                                                <td class="amount">50</td>
                                            </tr>
                                            <tr>
                                                <td class="trx-id">Level 2 (HERMIT)</td>
                                                <td class="trx-type" data-label="Transection Type">100</td>
                                                <td class="date" data-label="Date">100</td>
                                                <td class="amount">x1.0</td>
                                                <td class="amount">0</td>
                                            </tr>
                                            <tr>
                                                <td class="trx-id">Level 3 (STAR)</td>
                                                <td class="trx-type" data-label="Transection Type">100</td>
                                                <td class="date" data-label="Date">150</td>
                                                <td class="amount">x1.5</td>
                                                <td class="amount">+50</td>
                                            </tr>
                                            <tr>
                                                <td class="trx-id">Level 4 (MOON)</td>
                                                <td class="trx-type" data-label="Transection Type">100</td>
                                                <td class="date" data-label="Date">200</td>
                                                <td class="amount">x2.0</td>
                                                <td class="amount">+100</td>
                                            </tr>
                                            <tr>
                                                <td class="trx-id">Level 5 (SUN)</td>
                                                <td class="trx-type" data-label="Transection Type">100</td>
                                                <td class="date" data-label="Date">500</td>
                                                <td class="amount">x5.0</td>
                                                <td class="amount">+400</td>
                                            </tr>
                                            <tr>
                                                <td class="trx-id">Level 6 (EMPRESS)</td>
                                                <td class="trx-type" data-label="Transection Type">100</td>
                                                <td class="date" data-label="Date">1000</td>
                                                <td class="amount">x10.0</td>
                                                <td class="amount">+900</td>
                                            </tr>

                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>


    );
}
export default Betting;
