import React, { useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import FirstStep from "./Steps/FirstStep";
import SecondStep from "./Steps/SecondStep";
import ThirdStep from "./Steps/ThirdStep";
import { UserState } from "../typescript/types";

const initialUserState: UserState = {
    email_smart: "",
    first_name: "",
    last_name: "",
    mobile_smart: "",
    gender: "",
    position: "",
    company_name: "",
    workshops: [],
    investments: [],
    consultancyslots: [],
    registered: false,
};

const Registration: React.FC = () => {
    const [step, setStep] = useState<number>(1);
    const [user, setUser] = useState<UserState>(initialUserState);

    const resetSteps = useCallback(() => {
        setStep(1);
        setUser(initialUserState);
    }, []);

    const nextStep = useCallback(() => setStep((prevStep) => prevStep + 1), []);

    const handleUserData = useCallback(
        (data: UserState) => {
            setUser(data);
            nextStep();
        },
        [nextStep]
    );

    const RenderStep: React.FC = () => {
        switch (step) {
            case 1:
                return <FirstStep handleUserData={handleUserData} />;
            case 2:
                return <SecondStep nextStep={nextStep} data={user} />;
            case 3:
                return <ThirdStep reset={resetSteps} />;
            default:
                return <FirstStep handleUserData={handleUserData} />;
        }
    };




    return (
        <AnimatePresence>
            <motion.div
                className="w-screen h-full relative flex justify-center items-center flex-col"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            >
                <div className="flex justify-center items-center relative h-full overflow-auto">
                    <RenderStep />
                </div>
            </motion.div>
        </AnimatePresence>
    );
};

export default Registration;
