import axios from "axios";
import { useFormik } from "formik";
import React, { useEffect, useRef, useState } from "react";
import * as Yup from "yup";
import TextInput from "./form components/TextInput";
import SelectInput from "./form components/SelectInput";
import { ButtonTypes, ButtonVariants } from "../constants/constants";
import { toast } from "react-toastify";
import Button from "./global components/Button";
import Loader from "./Loader";
import { UserState, WorkshopType } from "../typescript/types";

const Registeration = () => {
  const [step, setStep] = useState(1);
  const [user, setUser] = useState<UserState>({
    email_smart: "",
    first_name: "",
    last_name: "",
    mobile_smart: "",
    gender: "",
    position: "",
    company_name: "",
    zones: [],
    registered: false,
  });

  const nextStep = () => {
    setStep(step + 1);
  };

  const handleUserData = async (data: UserState) => {
    setUser(data);
    nextStep();
  };

  const RenderStep = () => {
    switch (step) {
      case 1:
        return <FirstStep handleUserData={handleUserData} />;
      case 2:
        return <SecondStep nextStep={nextStep} data={user} />;
      case 3:
        return <ThirdStep />;
      default:
        return <FirstStep handleUserData={handleUserData} />;
    }
  };

  return (
    <div className="w-screen h-full relative flex justify-center items-center flex-col">
      <div className="absolute inset-0 bg-[url('../assets/images/background.png')] bg-cover bg-center" />
      <div className="absolute inset-0 bg-black opacity-40" />
      <div className="flex justify-center items-center relative h-full overflow-scroll">
        <RenderStep />
      </div>
    </div>
  );
};

type FirstStepProps = {
  handleUserData: (data: UserState) => void;
};

const FirstStep: React.FC<FirstStepProps> = ({ handleUserData }) => {
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("البريد الالكتروني غير صحيح")
        .required("هذا الحقل مطلوب"),
    }),
    onSubmit: (values) => {
      axios
        .get(
          `https://api.hayaksa.com/api/event/47/registration/check/?email=${values.email}`
        )
        .then(async (res) => {
          await handleUserData(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  });
  return (
    <form
      onSubmit={formik.handleSubmit}
      className="flex justify-center items-center text-primary text-lg
      w-[400px] h-screen flex-col gap-10 p-10 md:p-0"
    >
      <h1 className="font-cairo text-[35px] font-bold text-white">التسجيل</h1>
      <div className="w-full flex flex-col gap-5 items-center">
        <TextInput
          label="البريد الالكتروني"
          placeholder="البريد الالكتروني"
          className="input_group--text_input"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.email && formik.errors.email
              ? formik.errors.email
              : ""
          }
          name="email"
          id="email"
          type="email"
          disabled={formik.isSubmitting}
        />
        <Button
          type={ButtonTypes.SUBMIT}
          variant={ButtonVariants.PRIMARY}
          label="التالي"
          isSubmitting={formik.isSubmitting}
        />
      </div>
    </form>
  );
};

type SecondStepProps = {
  data: UserState;
  nextStep: () => void;
};

const SecondStep: React.FC<SecondStepProps> = ({ data, nextStep }) => {
  const saudiMobileRegex = /^9665[0-9]{8}$/;

  const [workshops, setWorkshops] = useState<WorkshopType[]>([]);
  const [isWorkshopLoading, setIsWorkshopLoading] = useState(false);

  const fetchWorkshops = async () => {
    setIsWorkshopLoading(true);
    axios
      .get("https://api.hayaksa.com/api/event/47/zone/list/")
      .then((res) => {
        setWorkshops(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsWorkshopLoading(false);
      });
  };

  const genderOptions = [
    {
      label: "ذكر",
      value: "male",
    },
    {
      label: "أنثى",
      value: "female",
    },
  ];

  const Toast: any = useRef(null);

  const formik = useFormik({
    initialValues: {
      email_smart: data.email_smart,
      first_name: data.first_name,
      last_name: data.last_name,
      mobile_smart: data.mobile_smart,
      gender: "",
      position: data.position,
      company_name: data.company_name,
      zones: data.zones,
    },
    validationSchema: Yup.object({
      first_name: Yup.string().required("هذا الحقل مطلوب"),
      last_name: Yup.string().required("هذا الحقل مطلوب"),
      email_smart: Yup.string()
        .email("البريد الالكتروني غير صحيح")
        .required("هذا الحقل مطلوب"),
      mobile_smart: Yup.string()
        .matches(saudiMobileRegex, "رقم الجوال غير صحيح")
        .required("هذا الحقل مطلوب"),
      gender: Yup.string().required("هذا الحقل مطلوب"),
      position: Yup.string().required("هذا الحقل مطلوب"),
      company_name: Yup.string().required("هذا الحقل مطلوب"),
    }),
    onSubmit: (values) => {
      data.registered
        ? axios
            .put(
              "https://api.hayaksa.com/api/event/47/registration/update/",
              values
            )
            .then(() => {
              Toast.current = toast.success("تم التسجيل بنجاح", {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
              });
              nextStep();
            })
            .catch(() => {
              Toast.current = toast.error("حدث خطأ ما", {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
              });
            })
            .finally(() => {
              formik.setSubmitting(false);
            })
        : axios
            .post("https://api.hayaksa.com/api/event/47/registration/", values)
            .then(() => {
              Toast.current = toast.success("تم التسجيل بنجاح", {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
              });
              nextStep();
            })
            .catch(() => {
              Toast.current = toast.error("حدث خطأ ما", {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
              });
            })
            .finally(() => {
              formik.setSubmitting(false);
            });
    },
  });

  useEffect(() => {
    fetchWorkshops();
  }, []);

  useEffect(() => {
    if (data?.gender) {
      genderOptions.forEach((option) => {
        if (option.value === data?.gender) {
          formik.setFieldValue("gender", option.value);
        }
      });
    }
  }, [data]);

  if (isWorkshopLoading)
    return (
      <div className="w-screen h-screen flex flex-col gap-3 justify-center items-center text-primary text-lg p-20 md:p-0">
        <div className="w-20 h-20">
          <Loader />
        </div>
        <h1 className="font-cairo text-[25px] font-bold text-white">
          جاري التحميل
        </h1>
      </div>
    );

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="flex justify-center items-center text-primary text-lg
      w-full h-full flex-col gap-10 p-10 "
    >
      <h1 className="font-cairo text-[35px] font-bold text-white">
        بيانات التسجيل
      </h1>
      <div className="w-full h-full flex flex-col gap-5 items-center">
        <TextInput
          label="البريد الالكتروني"
          placeholder="البريد الالكتروني"
          className="input_group--text_input"
          value={formik.values.email_smart}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.email_smart && formik.errors.email_smart
              ? formik.errors.email_smart
              : ""
          }
          name="email_smart"
          id="email_smart"
          type="email_smart"
          disabled={true}
        />
        <TextInput
          label="الاسم الأول"
          placeholder="الاسم الأول"
          className="input_group--text_input"
          value={formik.values.first_name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.first_name && formik.errors.first_name
              ? formik.errors.first_name
              : ""
          }
          name="first_name"
          id="first_name"
          type="text"
          disabled={data.registered}
        />
        <TextInput
          label="الاسم الأخير"
          placeholder="الاسم الأخير"
          className="input_group--text_input"
          value={formik.values.last_name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.last_name && formik.errors.last_name
              ? formik.errors.last_name
              : ""
          }
          name="last_name"
          id="last_name"
          type="text"
          disabled={data.registered}
        />
        <TextInput
          label="رقم الجوال"
          placeholder="رقم الجوال"
          className="input_group--text_input"
          value={formik.values.mobile_smart}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.mobile_smart && formik.errors.mobile_smart
              ? formik.errors.mobile_smart
              : ""
          }
          name="mobile_smart"
          id="mobile_smart"
          type="text"
          disabled={data.registered}
        />
        <SelectInput
          label="الجنس"
          placeholder="الجنس"
          name="gender"
          id="gender"
          value={formik.values.gender}
          onChange={(newValue) => {
            formik.setFieldValue("gender", newValue?.value);
          }}
          onBlur={formik.handleBlur}
          options={genderOptions}
          isDisabled={data.registered}
        />
        <TextInput
          label="المسمى الوظيفي"
          placeholder="المسمى الوظيفي"
          className="input_group--text_input"
          value={formik.values.position}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.position && formik.errors.position
              ? formik.errors.position
              : ""
          }
          name="position"
          id="position"
          type="text"
          disabled={data.registered}
        />
        <TextInput
          label="اسم الشركة"
          placeholder="اسم الشركة"
          className="input_group--text_input"
          value={formik.values.company_name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.company_name && formik.errors.company_name
              ? formik.errors.company_name
              : ""
          }
          name="company_name"
          id="company_name"
          type="text"
          disabled={data.registered}
        />
        <h1 className="font-cairo text-[35px] font-bold text-white my-4">
          الورش المتاحة
        </h1>
        <table className="table-auto w-full" style={{ direction: "ltr" }}>
          <tbody>
            {workshops.map((workshop: WorkshopType) => {
              return (
                <tr
                  key={workshop.id}
                  className="text-left grid grid-cols-8 gap-10 my-5 md:my-2
                  bg-secondary px-2 py-4 rounded-[10px]"
                >
                  <td className="text-white col-span-6">{workshop.title}</td>
                  <td className="text-white flex flex-col md:flex-row gap-2 items-center justify-center md:justify-end col-span-2">
                    <input
                      type="checkbox"
                      name={`zones-${workshop.id}`} // Each checkbox should have a unique name
                      value={workshop.id}
                      onChange={(e) => {
                        const value = parseInt(e.target.value);
                        if (formik.values.zones.includes(value)) {
                          formik.setFieldValue(
                            "zones",
                            formik.values.zones.filter((zone) => zone !== value)
                          );
                        } else {
                          formik.setFieldValue("zones", [
                            ...formik.values.zones,
                            value,
                          ]);
                        }
                      }}
                      className="text-primary"
                      checked={
                        formik.values.zones.includes(workshop.id) ? true : false
                      }
                    />
                    <label
                      htmlFor={`zones-${workshop.id}`}
                      className="text-white text-center"
                    >
                      اختر ورشة
                    </label>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <Button
          type={ButtonTypes.SUBMIT}
          variant={ButtonVariants.PRIMARY}
          label={data.registered ? "تحديث البيانات" : "تسجيل"}
          isSubmitting={formik.isSubmitting}
        />
      </div>
    </form>
  );
};

const ThirdStep = () => {
  return (
    <div
      className="flex justify-center items-center text-primary text-lg
  w-full h-screen flex-col gap-10 p-10 md:p-0"
    >
      <h1 className="font-cairo text-[35px] font-bold text-white">
        تم تسجيل المعلومات بنجاح
      </h1>
      <Button
        type={ButtonTypes.BUTTON}
        variant={ButtonVariants.PRIMARY}
        label="العودة للموقع"
        onClick={() => {
          window.location.href = "https://startsmartsaudi.startsmartsaudi.com/";
        }}
      />
    </div>
  );
};

export default Registeration;
