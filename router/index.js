import { createRouter, createWebHistory } from "vue-router";
import adminHome from "../views/adminHome.vue";

const routes = [

  {
    path: "/",
    name: "Login",
    component: () => import("../views/Login.vue"),
  },
  {
    path: "/adminHome",
    name: "adminHome",
    component: adminHome,
  },

  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Login.vue"),
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("../views/Register.vue"),
  },

  {
    path: '/lecturerEdit/:id',
    name: 'lecturerEdit',
    component: () => import("../views/LecturerEdit.vue")
  },

  {
    path: '/lecturerCreate/',
    name: 'lecturerCreate',
    component: () => import("../components/LecturerCreate.vue")
  },

  {
    path: '/apCreate/',
    name: 'apCreate',
    component: () => import("../components/APCreate.vue")
  },

  {
    path: '/APEdit/:id',
    name: 'APEdit',
    component: () => import("../views/APEdit.vue")
  },

  {
    path: '/ap/',
    name: 'ap',
    component: () => import("../views/AP.vue")
  },

  {
    path: '/manageC/',
    name: 'manageC',
    component: () => import("../views/ManageCommittee.vue")
  },
  {
    path: '/committeeCreate/',
    name: 'committeeCreate',
    component: () => import("../components/CommitteeCreate.vue")
  },
  {
    path: '/CommEdit/:id',
    name: 'CommEdit',
    component: () => import("../views/CommEdit.vue")
  },
  {
    path: '/studentProfile/',
    name: 'studentProfile',
    component: () => import("../views/studentProfile.vue"),
    meta: {
      authRequired: true,
    },
  },

  {
    path: '/studentReg/',
    name: 'studentReg',
    component: () => import("../views/studentReg.vue")
  },
  {
    path: '/SupervisorSelect/',
    name: 'SupervisorSelect',
    component: () => import("../views/SupervisorSelect.vue")
  },
  {
    path: '/submitProposal/',
    name: 'submitProposal',
    component: () => import("../views/submitProposal.vue")
  },
  {
    path: '/StudentView/',
    name: 'StudentView',
    component: () => import("../views/StudentView.vue")
  },
  {
    path: '/C_assign_L/:id',
    name: 'C_assign_L',
    component: () => import("../views/C_assign_L.vue")
  },
  {
    path: '/C_assign/',
    name: 'C_assign',
    component: () => import("../views/C_assign.vue")
  },

  {
    path: '/AssignSuper/',
    name: 'AssignSuper',
    component: () => import("../views/AssignSuper.vue")
  },

  {
    path: '/approveStudentSupervisor/',
    name: 'approveStudentSupervisor',
    component: () => import("../components/approveStudentSupervisor.vue")
  },
  
  {
    path: '/ManageStudent/',
    name: 'ManageStudent',
    component: () => import("../views/ManageStudent.vue")
  },

  {
    path: '/StudentList/',
    name: 'StudentList',
    component: () => import("../components/StudentList.vue")
  },

  {
    path: '/applicationList/',
    name: 'applicationList',
    component: () => import("../components/applicationList.vue")
  },

  {
    path: '/ProposalList/',
    name: 'ProposalList',
    component: () => import("../components/ProposalList.vue")
  },
  {
    path: '/EvaluateStudent/',
    name: 'EvaluateStudent',
    component: () => import("../views/EvaluateStudent.vue")
  },

  {
    path: '/Evaluate/:id',
    name: 'Evaluate',
    component: () => import("../views/Evaluate.vue")
  },

  {
    path: '/ManageProposal/',
    name: 'ManageProposal',
    component: () => import("../views/ManageProposal.vue")
  },
  {
    path: '/C_assign_E/:id',
    name: 'C_assign_E',
    component: () => import("../views/C_assign_E.vue")
  },
  {
    path: '/proposalResult/:id',
    name: 'proposalResult',
    component: () => import("../views/proposalResult.vue")
  },
  {
    path: '/SuperviseStudent/',
    name: 'SuperviseStudent',
    component: () => import("../views/SuperviseStudent.vue")
  },

  {
    path: '/studentDashboard/',
    name: 'studentDashboard',
    component: () => import("../views/studentDashboard.vue")
  },
  {
    path: '/viewProposal/:id',
    name: 'viewProposal',
    component: () => import("../views/viewProposal.vue")
  },

  {
    path: '/Supervise/:id',
    name: 'Supervise',
    component: () => import("../views/Supervise.vue")
  },

  {
    path: '/ProposalDetail/:id',
    name: 'ProposalDetail',
    component: () => import("../components/ProposalDetail.vue")
  },

  {
    path: '/SuperView/:id',
    name: 'SuperView',
    component: () => import("../components/SuperView.vue")
  },

  {
    path: '/CommView/:id',
    name: 'CommView',
    component: () => import("../components/CommView.vue")
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
