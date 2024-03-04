
import React, { Component } from 'react';
import BookingService from '../services/BookingService';
import planeBG from "../assets/images/planebg1.jpg";
import Footer from './Footer';
import Header from './Header';


class Passengers extends Component {

    constructor(props){
        super(props)
        if(!localStorage.getItem('user')){this.props.history.push('/login')}
        else{
        this.service = new BookingService();
        this.values= [] 
        this.state ={ 
            npsgn:parseInt(localStorage.getItem("nop")),
            pname:'',
            gen:['Select','Male','Female','Other'],
            gender:'',
            age:'',
            id:1,
            btn:false,
            info:false
        }
    }
    }

    handleClick = (idx) => {
        this.values.push({"id":this.state.id++ ,"pname":this.state.pname, "gender":this.state.gender, "age":this.state.age})
        console.log("Values :"+ JSON.stringify(this.values.length))
        this.setState({info:true})
        if(this.values.length===this.state.npsgn){
            this.setState({btn:true})
        }
    }

    savePassenger = () => {
        console.log("Values save :"+ JSON.stringify(this.values))
        localStorage.setItem('sid',JSON.stringify(this.values))
        this.service.addPassengers({"pass1":this.values})
        this.props.history.push('/summary')
    }


    render() {
    if(!localStorage.getItem('user')){return null}

    var fieldsArray = [];

    for (var i = 0; i < this.state.npsgn; i++) {
        console.log("inside for")
      fieldsArray.push(
          <tr>
            <td>
                <input 
                class="form-control"
                type='text'
                name='pname'
                onChange={e => this.setState({pname:e.target.value, info:false})} />
            </td>
            <td> 
            <select class="btn btn-info" name='gender' onChange={e => this.setState({gender:e.target.value})} >
                {this.state.gen.map(g => (
                    <option value={g}>{g}</option>
                ))}
            </select>
                
            </td>
            <td>
                <input 
                class="form-control"
                type='text' 
                name='age'
                onChange={e => this.setState({age:e.target.value})} maxLength="2" />
            </td>
            <td align='center'>
                <button disabled={this.state.btn} class="btn btn-warning " onClick={() => this.handleClick(i)}>Add Passenger</button>
            </td>
        </tr>
      );
    }


    return (
        <div class='pt-5'>
        <Header />
        <div class="py-5" style={{overflow: 'hidden', height: 'auto'}}>
            <div class="row mb-4">
                <div class="col-lg-8 mx-auto text-center">
                    <h1 class="display-6" style={{color:'white', fontWeight:'50px'}}>Add Passenger Details</h1>
                </div>
            </div>

            <div class="row" >
				<div class="col-md-10  mx-auto">
					<div class="card" >
                    <div class="card-header">
                    <div class="alert alert-primary">
                        <strong>Note: </strong> Please add passengers individually
                    </div>
                        <div class="bg-white shadow-sm pt-4 pl-2 pr-2 pb-2">
                            <div class="tab-content">
                            {this.state.info && <div class="alert alert-success">
                                <strong>Success!</strong>&nbsp; Passenger added with name : &nbsp; {this.state.pname}
                            </div>}
                                <div class="tab-pane fade show active pt-3">
                                <form>
                                    
                                    <table class="table">
                                        <tr align="center" >
                                            <th>Name</th>
                                            <th>Gender</th>
                                            <th>Age</th>
                                            <th>Add Passenger</th>
                                        </tr>
                                        <tbody>
                                            {fieldsArray}
                                        </tbody>

                                    </table>
                                    <div class="checkbox">
                                        <label><input type="checkbox" value="" required="required" />&nbsp; <a href="#" data-toggle="modal" data-target="#myModal">Agree Terms and Conditions</a></label>
                                    </div>
                                    <div class="card-footer"> 
                                        <button onClick={this.savePassenger} type="button" disabled={!this.state.btn} class="subscribe btn btn-primary btn-block shadow-sm"> Book Ticket</button>
                                    </div>

                                </form>
                                                                        
                                        <div class="modal fade" id="myModal">
                                            <div class="modal-dialog modal-dialog-centered">
                                            <div class="modal-content">
                                            
                                                
                                                <div class="modal-header">
                                                <h4 class="modal-title">Post COVID-19 Conditions of Carriage</h4>
                                                <button type="button" class="close" data-dismiss="modal">&times;</button>
                                                </div>
                                                
                                            
                                                <div class="modal-body">
                                                1. As per Government of India directive “vulnerable persons such as very elderly, pregnant ladies, passengers with health issues are advised to avoid air travel”
<br></br>
                                                2. Passengers to familiarize and follow the social distancing norms as required at the airport premises.
<br></br>
                                                3. Entry into the airport terminal will be permitted only with suitable PPE, at least with a face mask.
<br></br>
                                                4. Follow all self sanitisation norms, as applicable, at the airport.
<br></br>
                                                5. In case any symptoms of COVID-19, passengers may be debarred from entry into the airport or air travel by appropriate authorities.

                                                </div>
                                                
                                                
                                                <div class="modal-footer">
                                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                                </div>
                                                
                                            </div>
                                            </div>
                                        </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </div>
     
        </div>
    );
}
}

export default Passengers;


// import React, { Component } from 'react';
// import BookingService from '../services/BookingService';
// import planeBG from "../assets/images/planebg1.jpg";
// import Footer from './Footer';
// import Header from './Header';
// import { Formik, Form, Field, ErrorMessage } from 'formik';
// import * as Yup from 'yup';

// const passengerSchema = Yup.object().shape({
//   pname: Yup.string().min(3).required('Name is required'),
//   gender: Yup.string().notOneOf(['Select'], 'Please select a gender').required('Gender is required'),
//   age: Yup.number().required('Age is required').positive('Age must be a positive number').integer('Age must be an integer'),
// });

// class Passengers extends Component {

//     constructor(props){
//         super(props)
//         if(!localStorage.getItem('user')){this.props.history.push('/login')}
//         else{
//         this.service = new BookingService();
//         this.values= [] 
//         this.state ={ 
//             npsgn:parseInt(localStorage.getItem("nop")),
//             pname:'',
//             gen:['Select','Male','Female','Other'],
//             gender:'',
//             age:'',
//             id:1,
//             btn:false,
//             info:false
//         }
//     }
//     }

//     areFieldsFilled = () => {
//       return this.state.pname !== '' && this.state.gender !== 'Select' && this.state.age !== '';
//     }

//     handleClick = (idx) => {
//         this.values.push({"id":this.state.id++ ,"pname":this.state.pname, "gender":this.state.gender, "age":this.state.age})
//         console.log("Values :"+ JSON.stringify(this.values.length))
//         this.setState({info:true});
//         if(this.values.length === this.state.npsgn && this.areFieldsFilled()) {
//             this.setState({btn:true});
//         }
//     }

//     savePassenger = () => {
//         console.log("Values save :"+ JSON.stringify(this.values))
//         localStorage.setItem('sid',JSON.stringify(this.values))
//         this.service.addPassengers({"pass1":this.values})
//         this.props.history.push('/summary')
//     }

//     render() {
//     if(!localStorage.getItem('user')){return null}

//     var fieldsArray = [];

//     for (var i = 0; i < this.state.npsgn; i++) {
//         console.log("inside for")
//       fieldsArray.push(
//           <tr>
//             <td>
//                 <input 
//                 className="form-control"
//                 type='text'
//                 name='pname'
//                 onChange={e => this.setState({pname:e.target.value, info:false})} />
//             </td>
//             <td> 
//             <select className="btn btn-info" name='gender' onChange={e => this.setState({gender:e.target.value})} >
//                 {this.state.gen.map(g => (
//                     <option value={g} key={g}>{g}</option>
//                 ))}
//             </select>
                
//             </td>
//             <td>
//                 <input 
//                 className="form-control"
//                 type='text' 
//                 name='age'
//                 onChange={e => this.setState({age:e.target.value})} maxLength="2" />
//             </td>
//             <td align='center'>
//                 <button disabled={this.state.btn || !this.areFieldsFilled()} className="btn btn-warning" onClick={() => this.handleClick(i)}>Add Passenger</button>
//             </td>
//         </tr>
//       );
//     }

//     return (
//         <div className='pt-5'>
//         <Header />
//         <div className="py-5" style={{overflow: 'hidden', height: 'auto'}}>
//             <div className="row mb-4">
//                 <div className="col-lg-8 mx-auto text-center">
//                     <h1 className="display-6" style={{color:'white', fontWeight:'50px'}}>Add Passenger Details</h1>
//                 </div>
//             </div>

//             <div className="row" >
// 				<div className="col-md-10  mx-auto">
// 					<div className="card" >
//                     <div className="card-header">
//                     <div className="alert alert-primary">
//                         <strong>Note: </strong> Please add passengers individually
//                     </div>
//                         <div className="bg-white shadow-sm pt-4 pl-2 pr-2 pb-2">
//                             <div className="tab-content">
//                             {this.state.info && <div className="alert alert-success">
//                                 <strong>Success!</strong>&nbsp; Passenger added with name : &nbsp; {this.state.pname}
//                             </div>}
//                                 <div className="tab-pane fade show active pt-3">
//                                 <form>
                                    
//                                     <table className="table">
//                                         <thead>
//                                           <tr align="center" >
//                                               <th>Name</th>
//                                               <th>Gender</th>
//                                               <th>Age</th>
//                                               <th>Add Passenger</th>
//                                           </tr>
//                                         </thead>
//                                         <tbody>
//                                             {fieldsArray}
//                                         </tbody>

//                                     </table>
//                                     {/* <div className="checkbox">
//                                         <label><input type="checkbox" value="" required="required" />&nbsp; <a href="#" data-toggle="modal" data-target="#myModal">Agree Terms and Conditions</a></label>
//                                     </div> */}
//                                     <div className="card-footer"> 
//                                         <button onClick={this.savePassenger} type="button" 
//                                         // disabled={!this.state.btn} 
//                                         className="subscribe btn btn-primary btn-block shadow-sm"> Book Ticket</button>
//                                     </div>

//                                 </form>
                                                                        
//                                         <div className="modal fade" id="myModal">
//                                             <div className="modal-dialog modal-dialog-centered">
//                                             <div className="modal-content">
                                            
                                                
//                                                 <div className="modal-header">
//                                                 <h4 className="modal-title">Post COVID-19 Conditions of Carriage</h4>
//                                                 <button type="button" className="close" data-dismiss="modal">&times;</button>
//                                                 </div>
                                                
                                            
//                                                 <div className="modal-body">
//                                                 1. As per Government of India directive “vulnerable persons such as very elderly, pregnant ladies, passengers with health issues are advised to avoid air travel”
// <br></br>
//                                                 2. Passengers to familiarize and follow the social distancing norms as required at the airport premises.
// <br></br>
//                                                 3. Entry into the airport terminal will be permitted only with suitable PPE, at least with a face mask.
// <br></br>
//                                                 4. Follow all self sanitisation norms, as applicable, at the airport.
// <br></br>
//                                                 5. In case any symptoms of COVID-19, passengers may be debarred from entry into the airport or air travel by appropriate authorities.

//                                                 </div>
                                                
                                                
//                                                 <div className="modal-footer">
//                                                 <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
//                                                 </div>
                                                
//                                             </div>
//                                             </div>
//                                         </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
     
//         </div>
//     );
//   }
// }

// export default Passengers;

