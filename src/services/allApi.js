import { commonApi } from "./commonApi"
import { serverUrl } from "./serverUrl"

export const addworkoutApi=async(reqBody)=>{
    return await commonApi('POST',`${serverUrl}/workouts`,reqBody)
}

export const getworkoutApi=async()=>{
    return await commonApi('GET',`${serverUrl}/workouts`,{})
}

export const removeWorkoutApi=async(id)=>{
    return await commonApi('DELETE',`${serverUrl}/workouts/${id}`,{})
}