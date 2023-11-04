import {
  ICON_CARDIOLOGIST,
  ICON_DENTIST,
  ICON_DERMATOLOGY,
  ICON_GENERAL,
  ICON_GYNECOLOGY,
  ICON_LUNG,
  ICON_PSYCHIATRIST,
} from "../assets";

export const LIST_DEPARTMENT = [
  {
    title: "General",
    icon: <ICON_GENERAL />,
    url: "/general",
  },
  {
    title: "Cardiology",
    icon: <ICON_CARDIOLOGIST />,
    url: "/cardiology",
  },
  {
    title: "Obstetrics and Gynecology",
    icon: <ICON_GYNECOLOGY />,
    url: "/obstetrics-gynecology",
  },
  {
    title: "Dentistry",
    icon: <ICON_DENTIST />,
    url: "/dentistry",
  },
  {
    title: "Lungs Specialist",
    icon: <ICON_LUNG />,
    url: "/lungs-specialist",
  },
  {
    title: "Covid-19 ",
    icon: <ICON_GENERAL />,
    url: "/covid-19 ",
  },
  {
    title: "Pediatrics",
    icon: <ICON_GENERAL />,
    url: "/pediatrics",
  },
  {
    title: "Psychiatry",
    icon: <ICON_PSYCHIATRIST />,
    url: "/psychiatry",
  },
  {
    title: "Dermatology",
    icon: <ICON_DERMATOLOGY />,
    url: "/dermatology",
  },
];

export const GENDER = [
  { title: "Male", value: "male" },
  {
    title: "Female",
    value: "female",
  },
];

export const GENDER_ALL = [
  { title: "Male", value: "male" },
  {
    title: "Female",
    value: "female",
  },
  { title: "Other", value: "other" },
]

export const TYPE_OF_APPOINTMENT = [
  {
    title: "Previous",
    value: "previous",
  },
  {
    title: "Upcoming",
    value: "upcoming"
  }
]

export const LIST_TIME = [
  {
    title: "08:00 AM - 09:00 AM",
    startTime: "8:00:00",
    endTime: "9:00:00",
  },
  {
    title: "09:00 AM - 10:00 AM",
    startTime: "09:00:00",
    endTime: "10:00:00",
  },
  {
    title: "10:00 AM - 11:00 AM",
    startTime: "10:00:00",
    endTime: "11:00:00",
  },
  {
    title: "11:00 AM - 12:00 PM",
    startTime: "11:00:00",
    endTime: "12:00:00",
  },
  {
    title: "12:00 PM - 01:00 PM",
    startTime: "12:00:00",
    endTime: "13:00:00",
  },
  {
    title: "01:00 PM - 02:00 PM",
    startTime: "13:00:00",
    endTime: "14:00:00",
  },
  {
    title: "02:00 PM - 03:00 PM",
    startTime: "14:00:00",
    endTime: "15:00:00",
  },
  {
    title: "03:00 PM - 04:00 PM",
    startTime: "15:00:00",
    endTime: "16:00:00",
  },
  {
    title: "04:00 PM - 04:00 PM",
    startTime: "16:00:00",
    endTime: "17:00:00",
  },

];
