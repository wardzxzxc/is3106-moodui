import axios from 'axios';

export function login(loginForm, callback) {
    axios.post('http://localhost:8080/Moodui-war/webresources/authentication', loginForm)
        .then(res => {
            console.log(res);
            callback(res);
            sessionStorage.setItem('userId', res.data.id);
        }).catch(error => {
            callback(error);
            console.log(error);
        })
}

export function signUp(signUpForm, callback) {
    axios.post('http://localhost:8080/Moodui-war/webresources/users', signUpForm)
        .then(res => {
            console.log(res);
            callback(res);
        }).catch(error => {
            callback(error);
            console.error(error);
        })
}

export function fetchUserDetails() {
    return axios.get("http://localhost:8080/Moodui-war/webresources/users/" + sessionStorage.getItem('userId'))
}

export function updateUser(editForm) {
    return axios.put("http://localhost:8080/Moodui-war/webresources/users/" + sessionStorage.getItem("userId"), editForm);
}

export async function uploadDisplayPic(base64String) {
    return axios.put("http://localhost:8080/Moodui-war/webresources/users/" + sessionStorage.getItem("userId") + "/uploadimage", base64String)
}

export async function createApp(cId, createAppForm) {
    return axios.post("http://localhost:8080/Moodui-war/webresources/apps/" + sessionStorage.getItem("userId") + "/category/" + cId, createAppForm)
}

export async function createScreenshots(screenshots, appId) {
    return axios.post("http://localhost:8080/Moodui-war/webresources/screenshots/" + appId, screenshots);
}

export async function fetchUserApps(userId) {
    return axios.get("http://localhost:8080/Moodui-war/webresources/apps/searchappsbyuserid/" + userId);
}

export async function createMoodboard(mbForm) {
    return axios.post("http://localhost:8080/Moodui-war/webresources/moodboards/" + sessionStorage.getItem("userId"), mbForm);
}

export async function fetchUserMoodboards(userId) {
    return axios.get("http://localhost:8080/Moodui-war/webresources/moodboards/searchmoodboardsbyuserid/" + userId);
}


export function fetchAllApps() {
    return axios.get("http://localhost:8080/Moodui-war/webresources/apps/");
}

export async function deleteMoodboard(selectedId, callback) {
    return axios
        .delete(
            "http://localhost:8080/Moodui-war/webresources/moodboards/" + selectedId
        )
        
}

export async function deleteApp(selectedId, callback) {
    return axios
        .delete(
            "http://localhost:8080/Moodui-war/webresources/apps/" + selectedId
        )
}

export function fetchApp() {
    return axios.get("http://localhost:8080/Moodui-war/webresources/apps/" + sessionStorage.getItem("selectedAppId"));

}

export function fetchMoodboard() {
    return axios.get("http://localhost:8080/Moodui-war/webresources/moodboards/" + sessionStorage.getItem("selectedMoodboardId"));

}

export function addScreenshotToMoodboard(mId, sId) {
    return axios.put("http://localhost:8080/Moodui-war/webresources/moodboards/" + mId +"/screenshot/" + sId);
}


export function fetchCategoryApps(selectedCategoryId){
    return axios
    .get(
      "http://localhost:8080/Moodui-war/webresources/apps/searchAppByCategory/" + selectedCategoryId
            );
   
}

export function fetchCategories() {
    return axios.get("http://localhost:8080/Moodui-war/webresources/categories/");
}


export function fetchOtherUserDetails() {
    return axios.get("http://localhost:8080/Moodui-war/webresources/users/1")
}

export function fetchComment(commentId){
    return axios.get("http://localhost:8080/Moodui-war/webresources/comments/" + commentId);
}

export function fetchAllComments(appId){
    return axios.get("http://localhost:8080/Moodui-war/webresources/comments/searchcommentsbyappid/"+appId);
}

export async function createComment(createCommentForm, appId, commentType) {
    return axios.post("http://localhost:8080/Moodui-war/webresources/comments/" + sessionStorage.getItem("userId") + "/app/" + appId + "/"+ commentType, createCommentForm)
}
