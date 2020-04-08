import React from "react";

import "./index.css";

export default class Card extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayMessage: "Enter Card name",
      userName: "",
      valid: {
        status: true,
        message: '',
      },
      cardNumber:{
          statusNum: true,
          displayMessageNumber:"Enter your card number",
          number:"",
          numberMessage:'',

      },
      expireDate:{
        statusDate: true,
        displayMessageDate:"MM/YY",
        date:"",
        dateMessage:""
      }
    };

    this.checkName = this.checkName.bind(this);
    this.checkCardNumber= this.checkCardNumber.bind(this);
    this.formatString=this.formatString.bind(this.checkCardDate.bind(this));
    this.checkCardDate=this.checkCardDate.bind(this);
    
  }

  checkName(event) {
    
    var onlyTextRegex = /[^A-Za-z]/g;
    if (onlyTextRegex.test(event.target.value)) {
      this.setState({ valid: { status: false, message: "Tape only text"}});
    } else if (event.target.value.length > 20) {
      this.setState({ valid: { status: false, message: "Max length 20" } });      
    } else {
      this.setState({ userName: event.target.value });
    }
  }
  checkCardNumber(event){
    var onlyNumberRegex =/^[0-9\b]+$/;
    console.log(event.target.value,this.state.cardNumber.statusNum)
    
    if (!onlyNumberRegex.test(event.target.value)&&(event.target.value !='')) {
      this.setState({ cardNumber: { statusNum: false, numberMessage: "Tape only number"}});
    } else if (event.target.value.length > 16) {
      this.setState({ cardNumber: { statusNum: false, numberMessage: "Max length 16" } });      
    } else {
      this.setState({ cardNumber:{ statusNum: true, number: event.target.value.replace(/[^\dA-Z]/g, '').replace(/(.{4})/g, '$1 ').trim() } });
    }
 }
  
  checkCardDate(event){
      console.log(event.target.value)
      this.setState({ date: event.target.value  }); 
     
  }
   formatString(event) {
      var inputChar = String.fromCharCode(event.keyCode);
      var code = event.keyCode;
      var allowedKeys = [8];
      if (allowedKeys.indexOf(code) !== -1) {
        return;
      }
    
      event.target.value = event.target.value.replace(
        /^([1-9]\/|[2-9])$/g, '0$1/' // 3 > 03/
      ).replace(
        /^(0[1-9]|1[0-2])$/g, '$1/' // 11 > 11/
      ).replace(
        /^([0-1])([3-9])$/g, '0$1/$2' // 13 > 01/3
      ).replace(
        /^(0?[1-9]|1[0-2])([0-9]{2})$/g, '$1/$2' // 141 > 01/41
      ).replace(
        /^([0]+)\/|[0]+$/g, '0' // 0/ > 0 and 00 > 0
      ).replace(
        /[^\d\/]|^[\/]*$/g, '' // To allow only digits and `/`
      ).replace(
        /\/\//g, '/' // Prevent entering more than 1 `/`
      );
    }
  
 
  

  render() {
    const { valid } = this.state;
    return (
      <div className="displayCard">
        <div className="bgCreditCard">
          <div className="titleCard">
            <h1>Credit card</h1>
          </div>
          <div className="simCard">
            <img
              className="simCardImage"
              src="https://uploads.codesandbox.io/uploads/user/8f10ee4c-10fc-41b7-885a-4b795b293c1d/hh7c-chip.png"
              alt=""
            />
              <img
              className="simCardImage"
              src="https://uploads.codesandbox.io/uploads/user/8f10ee4c-10fc-41b7-885a-4b795b293c1d/aFYl-visa.jpg"
              alt=""
            />
          </div>
          <div className="idCard">
            <h2 className="idCardNumber">
              {
                
                this.state.cardNumber.number 
                            
              }</h2>
          </div>
          <div className="userCard">
            <div className="userCardID">5422</div>
            <div className="userCardValidation">
              <div className="bloc1">
                Valid   <br />
                thru
              </div>
              <div className="bloc2">
                     month/year
                <br />
                <span>{this.state.date}</span>
              </div>
            </div>
          </div>
          <div className="userCardDescription">{this.state.userName}</div>
        
        </div>
        <div className="inputInterface">
          <input type="text"  placeholder={this.state.displayMessage} onChange={this.checkName}   />
          {!valid.status ?  <span style={{color:'#ff0000'}}>{valid.message}</span> : null }
         
          <input type="text" maxLength="16"  placeholder={this.state.cardNumber.displayMessageNumber} onChange={this.checkCardNumber}/>
           {!this.state.cardNumber.statusNum ?  <span style={{color:'#ff0000'}}>{this.state.cardNumber.numberMessage}</span> : null }
        
          <input maxlength='5' type="text" placeholder={this.state.expireDate.displayMessageDate} onChange={this.checkCardDate} onKeyUp={this.formatString} />
         
        </div>
      </div>
    );
  }
}

