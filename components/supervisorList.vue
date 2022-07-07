<template>
  
    <div align="right">
    <button @click="submit" class="btn btn-success">Submit</button>
    </div>
    <div class="card mt-4">
    <table class="table m-0">
      <thead>
        <tr>
          <th scope="col">Name</th>
          <th scope="col">Email</th>
          <th scope="col">Department</th>
          <th scope="col">Select</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="lecturer in filteredLectList" :key="lecturer.key">
          <td width="25%">{{ lecturer.name }}</td>
          <td width="25%">{{ lecturer.email }}</td>
          <td width="25%">{{ lecturer.department }}</td>
          <td width="20%">
        

              <div class="form-check">
              <input class="form-check-input" name="flexRadioDefault"
                  id="flexRadioDefault1" type="radio" @change="onChange($event, lecturer.key)">
              <label class="form-check-label" for="flexRadioDefault1">
                </label>
              </div>
         
          </td>
        </tr>
      </tbody>

    </table>
  </div>
</template>

<script>
import { useLoadUsers, deleteUser, db } from "@/firebase";
import firebase from "firebase";

export default {

  data() {
    return {
      lecturerList : [],
      currentStudent : {},
      currentStudentUID : '',
      filteredLectList : []
    }
  },
  created() {

    firebase.auth().onAuthStateChanged((user) => {
      if(user) {
        db.collection('student').doc(user.uid).get().then((studentData) => {
          this.currentStudent = studentData.data();
          this.currentStudentUID = user.uid;
          console.log(this.currentStudent);
        })
      }
    })

    db.collection("lecturers").onSnapshot((snapshotChange) => {
      this.lecturerList = [];
      snapshotChange.forEach((doc) => {
        this.lecturerList.push({
          key: doc.id,
          selected : false,
          ...doc.data(),
        });
      });
      console.log(this.lecturerList);
    });

    const fetchLect = new Promise((resolve) => {
        db.collection("lecturers").onSnapshot((snapshotChange) => {
          this.lecturerList = [];
          snapshotChange.forEach((doc) => {
            this.lecturerList.push({
              key: doc.id,
              ...doc.data(),
            });
          });
          console.log(this.lecturerList);
          resolve(true);
        });
      })

    const fetchCmt = new Promise((resolve) => {
        db.collection("committee").onSnapshot((snapshotChange) => {
          this.committeeList = [];
          snapshotChange.forEach((doc) => {
            this.committeeList.push({
              key: doc.id,
              ...doc.data(),
            });
          });
          console.log(this.committeeList);
          resolve(true);
        });
      })




    Promise.all([fetchLect, fetchCmt]).then(() => {

      this.filteredLectList = []
      for(let lect of this.lecturerList) {
        var hide = false;
        for(let cmt of this.committeeList) {
          if(lect.email == cmt.email) {
            hide = true;
          }
        }
        if(!hide) {
          this.filteredLectList.push(lect);
        }
      }
      
      console.log(this.filteredLectList);
      
      this.loaded = true;
      

    })


  },
  methods: {
    onChange(event,value) {
      for(let lecturer of this.lecturerList) {
        if(lecturer.key == value) {
          lecturer.selected = true;
        } else {
          lecturer.selected = false;
        }
      }

      console.log(this.lecturerList);
    },
    submit() {
      for(let lecturer of this.lecturerList) {
        if(lecturer.selected) {
          db.collection('student-supervisor').add({
            student: this.currentStudent,
            studentId: this.currentStudentUID,
            supervisorId: lecturer.key,
            supervisor: lecturer,
            status: 'pending',
          }).then(() => {
            alert('done');
          })
        }
      }
    }

  },
  setup() {
    const users = useLoadUsers();
    return { users, deleteUser };
  },
};
</script>
