import firebase from "firebase";
import { ref, onUnmounted } from "vue";

const config = {
  apiKey: "AIzaSyAp_uKvUXPyMJ8ab7K1WWUH3rLVLAQIghM",
  authDomain: "project-69cc1.firebaseapp.com",
  projectId: "project-69cc1",
  storageBucket: "project-69cc1.appspot.com",
  messagingSenderId: "901669442942",
  appId: "1:901669442942:web:de88006259af16043c0f2f",
};

const firebaseApp = firebase.initializeApp(config);

export const db = firebaseApp.firestore();
const usersCollection = db.collection("lecturers");
const apCollection = db.collection("academic");
const CmCollection = db.collection("committee");
const PfCollection = db.collection("studentProfile");
const PTCollection = db.collection("projectType");
const ProjectCollection = db.collection("project");
const StudentCollection = db.collection("student");

export const createUser = (user) => {
  return usersCollection.add(user);
};

export const getUser = async (id) => {
  const user = await usersCollection.doc(id).get();
  return user.exists ? user.data() : null;
};

export const updateUser = (id, user) => {
  return usersCollection.doc(id).update(user);
};

export const deleteUser = (id) => {
  if (confirm("Are you sure?")) {
    usersCollection
      .doc(id)
      .delete()
      .then(function() {
        alert("Successfully deleted");
      })
      .catch(function(error) {
        alert.error("Error removing lecturer: ", error);
      });
  }
};

export const useLoadUsers = () => {
  const users = ref([]);
  const close = usersCollection.onSnapshot((snapshot) => {
    users.value = snapshot.docs.map((doc) => ({ id: doc.id, selected: false,...doc.data(),}));
  });
  onUnmounted(close);
  return users;
};

//this is linee

export const createAP = (Ap) => {
  console.log("ap", Ap);
  return apCollection.add(Ap);
};

export const getAP = async (id) => {
  const Ap = await apCollection.doc(id).get();
  return Ap.exists ? Ap.data() : null;
};

export const updateAP = (id, Ap) => {
  return apCollection.doc(id).update(Ap);
};

export const deleteAP = (id) => {
  // return apCollection.doc(id).delete();
  if (confirm("Are you sure?")) {
    apCollection
      .doc(id)
      .delete()
      .then(function() {
        alert("Successfully deleted");
      })
      .catch(function(error) {
        alert.error("Error removing academic Program: ", error);
      });
  }
};

export const useLoadAP = () => {
  const Ap = ref([]);
  const close = apCollection.onSnapshot((snapshot) => {
    Ap.value = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  });
  onUnmounted(close);
  return Ap;
};

//Committee
export const createCm = (Cm) => {
  return CmCollection.add(Cm);
};

export const getCm = async (id) => {
  const Cm = await CmCollection.doc(id).get();
  return Cm.exists ? Cm.data() : null;
};

export const updateCm = (id, Cm) => {
  return CmCollection.doc(id).update(Cm);
};

export const deleteCm = (id) => {
  // return apCollection.doc(id).delete();
  if (confirm("Are you sure?")) {
    CmCollection.doc(id)
      .delete()
      .then(function() {
        alert("Successfully deleted");
      })
      .catch(function(error) {
        alert.error("Error removing academic Program: ", error);
      });
  }
};

export const useLoadCm = () => {
  const Cm = ref([]);
  const close = CmCollection.onSnapshot((snapshot) => {
    Cm.value = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  });
  onUnmounted(close);
  return Cm;
};

//User Profile
export const createPf = (Pf) => {
  return PfCollection.add(Pf);
};

export const getPf = async (id) => {
  const Pf = await PfCollection.doc(id).get();
  return Pf.exists ? Pf.data() : null;
};

export const updatePf = (id, Pf) => {
  return PfCollection.doc(id).update(Pf);
};

export const deletePf = (id) => {
  // return apCollection.doc(id).delete();
  if (confirm("Are you sure?")) {
    PfCollection.doc(id)
      .delete()
      .then(function() {
        alert("Successfully deleted");
      })
      .catch(function(error) {
        alert.error("Error removing academic Program: ", error);
      });
  }
};

export const useLoadPf = () => {
  const Pf = ref([]);
  const close = PfCollection.onSnapshot((snapshot) => {
    Pf.value = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  });
  onUnmounted(close);
  return Pf;
};

//projectType

export const createPT = (PT) => {
  return PTCollection.add(PT);
};

export const getPT = async (id) => {
  const PT = await PTCollection.doc(id).get();
  return PT.exists ? PT.data() : null;
};

export const updatePT = (id, PT) => {
  return PTCollection.doc(id).update(PT);
};

export const deletePT = (id) => {
  // return apCollection.doc(id).delete();
  if (confirm("Are you sure?")) {
    PTCollection.doc(id)
      .delete()
      .then(function() {
        alert("Successfully deleted");
      })
      .catch(function(error) {
        alert.error("Error removing academic Program: ", error);
      });
  }
};

export const useLoadPT = () => {
  const PT = ref([]);
  const close = PTCollection.onSnapshot((snapshot) => {
    PT.value = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  });
  onUnmounted(close);
  return PT;
};

//Project
export const createProject = (PT) => {
  return ProjectCollection.add(PT);
};

export const getProject = async (id) => {
  const PT = await ProjectCollection.doc(id).get();
  return PT.exists ? PT.data() : null;
};

export const updateProject = (id, PT) => {
  return ProjectCollection.doc(id).update(PT);
};

export const deleteProject = (id) => {
  // return apCollection.doc(id).delete();
  if (confirm("Are you sure?")) {
    ProjectCollection.doc(id)
      .delete()
      .then(function() {
        alert("Successfully deleted");
      })
      .catch(function(error) {
        alert.error("Error removing academic Program: ", error);
      });
  }
};

export const useLoadProject = () => {
  const PT = ref([]);
  const close = ProjectCollection.onSnapshot((snapshot) => {
    PT.value = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  });
  onUnmounted(close);
  return PT;
};

//student

export const getSudent = async (id) => {
  const St = await StudentCollection.doc(id).get();
  return St.exists ? St.data() : null;
};

export const deleteStudent = (id) => {
  // return apCollection.doc(id).delete();
  if (confirm("Are you sure?")) {
    StudentCollection.doc(id)
      .delete()
      .then(function() {
        alert("Successfully deleted");
      })
      .catch(function(error) {
        alert.error("Error removing academic Program: ", error);
      });
  }
};

export const useLoadStudent = () => {
  const St = ref([]);
  const close = StudentCollection.onSnapshot((snapshot) => {
    St.value = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  });
  onUnmounted(close);
  return St;
};

export const getStudentArray = () => {
  var studentArray = [];
  StudentCollection.onSnapshot((snapshot) => {
    studentArray = [];
    snapshot.forEach((doc) => {
      var tmp = doc.data();
      tmp["id"] = doc.id;
      studentArray.push(tmp);
    });

    // onUnmounted(close);
    console.log(studentArray);
    return studentArray;
  });
};
