import Firebase from 'firebase'


const firebaseConfig ={
    apiKey:"AIzaSyCMD3_3Lk00Gr6teB7Pcl2ANVYr5-07yXI",
    databaseURL:"https://trends-cf627-default-rtdb.firebaseio.com/",
    projectId:"trends-cf627",
    appId:'1:323299047534:android:5b3add6a48fd30dd9a4e7f',
} ;

export default Firebase.initializeApp(firebaseConfig)