import { LANGUAGE_OPTIONS } from "./useLanguage";

const ENGLISH_TRANSLATIONS = {
  firstStep: {
    invalidEmail: "Invalid email address",
    fieldRequired: "This field is required",
    registration: "Registration",
    email: "Email",
    emailPlaceholder: "Enter your email",
    next: "Next"
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
    priorityNotice: "Priority is given to early arrivals, and you can register for more than one session to be able to benefit from all consultants.",
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
    investmentSessionsInfo: "You can register for investment sessions by",
    clickHere: "clicking here",
    details: "Details",
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
    aboutWorkshop: "Workshop topics"
  },
  success:{
    registrationSuccess: "Registration Successful",
    updateSuccess: "Data updated successfully",
    error: "An error occurred"
  }
};


const ARABIC_TRANSLATIONS = {
  firstStep: {
    invalidEmail: "البريد الإلكتروني غير صحيح",
    fieldRequired: "هذا الحقل مطلوب",
    registration: "التسجيل",
    email: "البريد الإلكتروني",
    emailPlaceholder: "أدخل بريدك الإلكتروني",
    next: "التالي"
  }, 
  secondStep: {
    pageTitle: "بيانات التسجيل",
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
    consultationLab: "معمل الاستشارات",
    investmentForum: "منتدى الاستثمار",
    priorityNotice: "الأولوية للحضور المبكر، كما يمكنك التسجيل في أكثر من جلسة لتتمكن من الاستفادة من جميع الاستشاريين",
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
    investmentSessionsInfo: "يمكنك التسجيل في جلسات الإستثمار عن طريق",
    clickHere: "الضغط هنا",
    details: "التفاصيل",
    workshopNumber: "رقم ورشة العمل",
    workshopDate: "تاريخ ورشة العمل",
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
