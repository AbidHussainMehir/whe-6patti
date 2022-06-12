import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Navbar, Nav, Image, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { loadWeb3 } from '../../apis/api'
 const NavbarCustom = () => {
  const navigate = useNavigate();
  
  const [show, handleShow] = useState(false);

  const [accoutadd, setaccoutadd] = useState("Connect")
  let MainAddress
  const get = async () => {

      MainAddress = await loadWeb3()
      let acc = MainAddress.substring(0, 6) + "..." + MainAddress.substring(MainAddress.length - 6)
      setaccoutadd(acc);


  }

  useEffect(() => {
  get();
})


  
  useEffect(() => {
    let prev = window.scrollY;
    let scrollD = "";  

    window.addEventListener("scroll", (e) => {
      const window = e.currentTarget;

      if (prev > window.scrollY) {
        scrollD = "up";
      } else if (prev < window.scrollY) {
        scrollD = "down";
      }
      prev = window.scrollY; 

      if (window.scrollY > 40 && scrollD === "up") {
        handleShow(true);
      } else handleShow(false);
    });
    return () => {
      window.removeEventListener("scroll");
    };
  }, []);



  const navItem = [
    {
      title: "NoWallet",
      link: "/wallet",
    },
  ];
 
  
  

  return (
    <div class="header">
    <div class="container">
        <div class="header-bottom">
            <div class="header-bottom-area align-items-center">
                <div class="logo"><a href=""><img src="/logo.png" alt="logo"/></a></div>
                <ul class="menu">
                    <li class="button-wrapper">
                        <a href="#" class="cmn--btn active btn--lg"> {accoutadd}</a>
                    </li>
                    
                    
                    <button class="btn-close btn-close-white d-lg-none"></button>
                </ul>
                <div class="header-trigger-wrapper d-flex d-lg-none align-items-center">
                    <div class="header-trigger me-4">
                        <span></span>
                    </div>
                    <a href="#" class="cmn--btn active btn--md d-none d-sm-block">{accoutadd}</a>
                </div>
            </div>
        </div>
    </div>
</div>
  );
};

export default NavbarCustom;
