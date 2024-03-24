import React from 'react'
import './Home.css'
import bgImg from './bgImg.jpg'
import Product from './Product/Product.js'
import ac from './ac.jpg'
import cooler from './cooler.jpg'
import iphone14 from './iphone14.jpg'
import laptop from './laptop.jpg'
import sonytv from './sonytv.png'
import washingMachine from './washingMachine.jpg'
function Home() {
  return (
    <div className="home">
      <div className="homeContainer">
        <img className="bgImage" src={bgImg} alt="" />
        <div className='mainRow'>
            <Product title='Apple iPhone 14 (128 GB) - Starlight' price={70990} id='12321341'
            rating={5} image={iphone14}
            />
            <Product title='Apple 2020 MacBook Air Laptop M1 chip, 13.3-inch/33.74 cm Retina Display, 8GB RAM, 256GB SSD Storage, Backlit Keyboard, FaceTime HD Camera, Touch ID. Works with iPhone/iPad; Space Grey' price={90000} id='49538094'
            rating={5} image={laptop}
            />
        </div>
        <div className='mainRow'>
            <Product title='Chintan Mini CoOlEr for room cooling mini CoOlEr ac portable air CoOlEr portable air conditioners for Home Office Artic CoOlEr 3 In 1 Conditioner Humidifier Purifier Mini CoOlEr' price={724} id='4903850'
            rating={3} image={cooler}
            />
            <Product title='BRAVIA XR 77” Class A80L OLED 4K HDR Google TV (2023)' price={229595} id='90829332'
            rating={4} image={sonytv}
            
            />
            <Product title='Whirlpool 6.5 Kg Royal Fully-Automatic Top Loading Washing Machine (WM ROYAL 6.5 GREY 5YMW, Spiro Wash)' price={14490} id='3254354345'
            rating={4} image={washingMachine}
            />
        </div>
        <div className='mainRow'>
            
            <Product title='Samsung 1.5 Ton 5 Star Inverter Split AC (Copper, Convertible 5-in-1 Cooling Mode, Anti-Bacteria, 2023 Model AR18CYNZABE White)' price={42499} id='23445930'
            rating={4} image={ac}
            />
        </div>
      </div>
    </div>
  )
}

export default Home
