import { createSlice } from "@reduxjs/toolkit";

 interface doctor {
_id:string,
name:string,
email:string,
specialization:string,
profileImage:string,
notes:string,
contactNumber:string,
}

interface doctorState{
    doctorsList: doctor[],
    // singleDoctor:doctor | null,
}

const initialState:doctorState ={
doctorsList:[],
// singleDoctor: null,
}

const doctorSlice = createSlice({
    name:"doctor",
    initialState,
    reducers :{
        getAllDoctors : (state,action)=>{
            state.doctorsList= action.payload;
        },
        }
});

export const {getAllDoctors} = doctorSlice.actions;
export default doctorSlice.reducer;