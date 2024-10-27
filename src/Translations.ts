import { LANGUAGE_OPTIONS } from "./useLanguage";

const ENGLISH_TRANSLATIONS = {
  firstStep: {
    event_ended:"Thank you for your interest. See you at the next edition of the Start Smart Forum.",
    invalidEmail: "Invalid email address",
    fieldRequired: "This field is required",
    registration: "Registration",
    registrationSubTitle:"Registration for the Start Smart Forum 2024 The Community Jameel Foundation is pleased to invite you to the Start Smart Forum 2024, 22-23 October, at Jeddah Hilton Hotel, which will include a number of enriching activities for the Saudi entrepreneurship ecosystem, such as; Engaging panel discussions, Startup exhibition for networking, Agreement signing ceremony, Training workshops, Mentorship sessions, Investment forum and Announcement of competition winners.",
    event_callout:"Hurry up and register to reserve your seat!",
    email: "Email",
    emailPlaceholder: "Enter your email",
    next: "Next",
    supported_by:"Supported and organized by"
  },
  secondStep: {
    pageTitle: "Registration Details",
    email: "Email",
    firstName: "First Name",
    lastName: "Last Name",
    mobile: "WhatsApp Number",
    mobileExample: "WhatsApp Number (e.g., 966512345678)",
    gender: "Gender",
    male: "Male",
    female: "Female",
    companyName: "Company Name",
    position: "Position",
    workshopsQuestion: "Would you like to register for workshops, consultation sessions, or investment forum?",
    workshops: "Workshops",
    consultationLab: "Consultation Sessions",
    investmentForum: "Investment Forum",
    priorityNoticeWorkshop: "Priority entry will be given to those who arrive early, and attendees can register for more than one workshop or consultation session to gain the most benefit from all the workshops and consultants.",
    priorityNoticeConsultations: "Priority is given to early arrivals, and you can register for more than one session to be able to benefit from all consultants.",
    priorityNoticeInvesments:"All activities offered to investors are subject to the terms and conditions of Falak Business and Investment.",
    updateData: "Update Data",
    register: "Register",
    loading: "Loading",
    thisFieldRequired: "This field is required",
    invalidEmail: "Invalid email address",
    invalidMobile: "Invalid mobile number"
  },
  thirdStep: {
    registrationSuccess: "Registration Successful",
    returnToWebsite: "New Registration"
  },
  consultationList: {
    workshopField: "Consultation Field",
    workshopPresenter: "Consultation Presenter",
    workshopDuration: "Consultation Duration",
    workshopTopic: "Consultation Topics",
    workshopDate: "Consultation Date",
    minutes: "minutes",
    details: "Details",
    availableTimes: "Available Times",
    date: "Date",
    time: "Time",
    selected: "Cancel",
    reserved: "Reserved",
    reserve: "Reserve"
  },
  workshopList: {
    investmentSessionsInfo: "Entrepreneurs can register for pitching sessions to investors by clicking here ",
    clickHere: "clicking here",
    details: "Details",
    workshopName:"Worksop ",
    workshopNumber: "Workshop Number",
    workshopDate: "Workshop Date",
    WorkshopDuration: "Workshop Duration",
    instructor: "Workshop Instructor",
  },
  details: {
    instructor: "Instructor",
    jobDescription: "Job Description",
    notSpecified: "Not specified",
    consultationType: "Consultation Type",
    date: "Workshop Date",
    accordingToAppointment: "According to appointment",
    time: "Workshop Time",
    duration: "Workshop Duration",
    minutes: "minutes",
    aboutInstructor: "Instructor's Brief",
    aboutWorkshop: "Workshop topics",
   
  },
  success:{
    registrationSuccess: "Registration Successful",
    updateSuccess: "Data updated successfully",
    error: "An error occurred"
  },
  charts:{
    charts_title:"statistics of Start Smart Competition 2024",
    total_of_attendes_title:"Number of Attendes in Start Smart Competition 2024",
    total_of_attendes_workshops_title:"Number of Attendes in The Workshops",
    total_of_attendes_consultations_title:"Number of Attendes in The Consultations Sessions"
  }
};


const ARABIC_TRANSLATIONS = {
  firstStep: {
    event_ended:"شكرا لاهتمامكم نراكم في النسخة القادمة من منتدى ستارت سمارت",
    invalidEmail: "البريد الإلكتروني غير صحيح",
    fieldRequired: "هذا الحقل مطلوب",
    registration: "التسجيل في منتدى ستارت سمارت 2024",
    registrationSubTitle: "تسعد مؤسسة مجتمع جميل الأهلية بدعوتكم إلى منتدى ستارت سمارت 2024، يومي 22 - 23 أكتوبر، بجدة فندق الهيلتون، والذي سيضم عدداً من الأنشطة المثرية لمنظومة ريادة الأعمال السعودية، مثل؛ جلسات حوارية مثرية، معرض الشركات الناشئة لبناء العلاقات، حفل توقيع الاتفاقيات، ورش عمل تدريبية، جلسات توجيه وإرشاد، منتدى الاستثمار، إعلان الفائزين بالمسابقة",
    event_details_title:"تفاصيل الفعالية:",
    event_location_title:"المكان: فندق الهيلتون، جدة",
    event_date:"التاريخ: 22 - 23 أكتوبر 2024",
    event_time:"الوقت: 6-10 مساءً",
    event_callout :"سارعوا بالتسجيل لحجز مقعدكم",
    email: "البريد الإلكتروني",
    emailPlaceholder: "أدخل بريدك الإلكتروني",
    next: "التالي",
    supported_by:"بدعم وتنظيم"
  }, 
  secondStep: {
    pageTitle: "بيانات التسجيل في منتدى ستارت سمارت 2024",
    email: "البريد الإلكتروني",
    firstName: "الاسم الأول",
    lastName: "الاسم الأخير",
    mobile: "رقم الواتساب",
    mobileExample: "رقم الواتساب (مثال: 966512345678)",
    gender: "الجنس",
    male: "ذكر",
    female: "أنثى",
    companyName: "اسم الجهة",
    position: "المسمى",
    workshopsQuestion: "هل ترغب بالتسجيل في ورش العمل أو الجلسات الاستشارية أو منتدى الاستثمار ؟",
    workshops: "ورش العمل",
    consultationLab: "الجلسات الاستشارية",
    investmentForum: "منتدى الاستثمار",
    priorityNoticeWorkshop: "إن أولوية الدخول ستقدم لمن يحضر مبكراً، كما يمكن للحضور التسجيل في أكثر من ورشة عمل أو جلسة استشارية لتحقيق الاستفادة الأكبر من جميع الورش والاستشاريين.",
    priorityNoticeConsultations: "الأولوية للحضور المبكر، كما يمكنك التسجيل في أكثر من جلسة لتتمكن من الاستفادة من جميع الاستشاريين",
    priorityNoticeInvesments:"جميع أنشطة العرض على المستثمرين تخضع للشروط و الأحكام الخاصة بفلك للأعمال والاستثمار.",
    updateData: "تحديث البيانات",
    register: "تسجيل",
    loading: "جاري التحميل",
    thisFieldRequired: "هذا الحقل مطلوب",
    invalidEmail: "البريد الإلكتروني غير صحيح",
    invalidMobile: "رقم الواتساب غير صحيح"
  },
  thirdStep: {
    registrationSuccess: "تم التسجيل بنجاح",
    returnToWebsite: "تسجيل جديد"
  },
  consultationList: {
    workshopField: "مجال الاستشارة",
    workshopPresenter: "مقدم الاستشارة",
    workshopDuration: "مدة الاستشارة",
    workshopTopic: "مواضيع الاستشارة",
    workshopDate: "تاريخ الاستشارة",
    minutes: "دقيقة",
    details: "التفاصيل",
    availableTimes: "المواعيد المتاحة",
    date: "التاريخ",
    time: "الوقت",
    selected: "إلغاء",
    reserved: "محجوز",
    reserve: "حجز"
  },
  workshopList: {
    investmentSessionsInfo: "يمكن لرواد الأعمال التسجيل في جلسات العرض على المستثمرين عن طريق ",
    clickHere: "الضغط هنا",
    details: "التفاصيل",
    workshopName:"ورشة عمل ",
    workshopNumber: "رقم الورشة",
    workshopDate: "موعد الورشة",
    workshopTime: "وقت الورشة",
    WorkshopDuration: "مدة ورشة العمل",
    instructor: "مقدم الورشة",
  },
  details: {
    instructor: "مقدم الورشة",
    jobDescription: "الوصف الوظيفي",
    notSpecified: "غير محدد",
    consultationType: "نوع الاستشارة",
    date: "تاريخ ورشة العمل",
    accordingToAppointment: "حسب الموعد المحدد",
    time: "وقت ورشة العمل",
    duration: "مدة ورشة العمل",
    minutes: "دقيقة",
    aboutInstructor: "نبذة عن مقدم ورشة العمل",
    aboutWorkshop: "محاور ورشة العمل"
 
  },
  success:{
    registrationSuccess: "تم التسجيل بنجاح",
    updateSuccess: "تم تحديث البيانات بنجاح",
    error: "حدث خطأ ما"
  },
  charts:{
    charts_title:"إحصائيات مسابقة ستارت سمارت 2024",
    total_of_attendes_title:"عدد الحضور في  مسابقة ستارت سمارت 2024",
    total_of_attendes_workshops_title:"عدد الحضور لورش العمل ",
    total_of_attendes_consultations_title:"عدد الحضور لجلسات الاستشارات "
  }
};

const TRANSLATION_SETUP = {
  resources: {
    en: {
      translation: ENGLISH_TRANSLATIONS,
    },
    ar: {
      translation: ARABIC_TRANSLATIONS,
    },
  },
  fallbackLng: LANGUAGE_OPTIONS.ARABIC,
};

export default TRANSLATION_SETUP;
