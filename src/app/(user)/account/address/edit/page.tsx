'use client';

import { updateUserAddress } from "@/actions/userActions";
import { EditableInputFIeld, EditableSelectField, EditableTextAreaFIeld } from "@/components/interractivity/input";
import { SubmitButton } from "@/components/submitButton";
import { fetchLgasApi, fetchStatesApi } from "@/services/baseAPis";
import { retrieveUserAddressApi } from "@/services/userApis";
import { UserAddressData } from "@/types/userInterfaces";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState, useActionState } from "react";
import { ZodIssue } from "zod";

const initialState = {
    message: "",
};


export default function EditAddress() {
    const pathName = usePathname();
    const router = useRouter()
    const [userAddressInfo, setUserAddressInfo] = useState<UserAddressData | null>(null);
    const [state, formAction] = useActionState(updateUserAddress, initialState);
    const [errors, setErrors] = useState<ZodIssue[] | undefined>([]);
    const [states, setStates] = useState<PlaceData[]>();
    const [lgas, setLgas] = useState<PlaceData[]>();

    useEffect(() => {
        async function fetchStates() {
            const response = await fetchStatesApi()
            if (response.status === 200) {
                setStates(response.data)
            }
        }
        fetchStates()
    }, [])

    useEffect(() => {
        async function fetchUserAddress() {
            // retrieve the user info, the query the LGA DB with state id and the sets the lga to the one that matches the state
            const response = await retrieveUserAddressApi();
            if (response.status === 200) {
                const lgaResponse = await fetchLgasApi(response.data.state)
                if (lgaResponse.status === 200)
                    setLgas(lgaResponse.data)
            }
            setUserAddressInfo(response.data)
        }
        fetchUserAddress()
    }, [])

    useEffect(() => {
        if (state.status === 200) {
            router.push("/account/address");
        } else if (state.status === 401) {
            router.push(`/login?callbackUrl=${encodeURIComponent(pathName!)}`);
        }
    }, [state, router, pathName]);

    const fetchLgas = async (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = event.target.value;
        if (selectedValue) {
            try {
                const response = await fetchLgasApi(selectedValue)
                if (response.status === 200) {
                    setLgas(response.data)
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
    };

    useEffect(() => {
        setErrors(state.errors)
    }, [state])

    const getErrorForField = (fieldName: string) => {
        return errors?.filter((error) => error.path.includes(fieldName)).map((error) => error.message).join(', '); // Combines multiple messages if any
    };

    return (
        <>
            {userAddressInfo != null && (<>
                <h1 className="text-[372F2F] font-bold mb-2" >Edit Address Information</h1>
                <form action={formAction} >
                    <EditableSelectField label="State" name="state" id="state" data={states} defaultValue={userAddressInfo.state} handleStateChange={fetchLgas} error={getErrorForField('state')} />
                    <EditableInputFIeld
                        inputFor="city-town"
                        inputText="City / Town"
                        inputType="text"
                        inputId="city-town"
                        inputName="city-town"
                        defaultValue={userAddressInfo.city_town}
                        required
                        error={getErrorForField('city_town')}
                    />
                    <EditableSelectField label="Local Government Area" name="lga" id="lga" data={lgas} defaultValue={userAddressInfo.lga} error={getErrorForField('lga')} />

                    <EditableInputFIeld
                        inputFor="prominent-motor-park"
                        inputText="Prominent Motor Park"
                        inputType="text"
                        inputId="prominent-motor-park"
                        inputName="prominent-motor-park"
                        defaultValue={userAddressInfo.prominent_motor_park}
                        error={getErrorForField('prominent_motor_park')}
                    />
                    <EditableInputFIeld
                        inputFor="landmark-signatory-place"
                        inputText="Landmark / Signatory place (for non park delivery)"
                        inputType="text"
                        inputId="landmark-signatory-place"
                        inputName="landmark-signatory-place"
                        defaultValue={userAddressInfo.landmark_signatory_place}
                        error={getErrorForField('landmark_signatory_place')}
                    />
                    <EditableTextAreaFIeld
                        inputFor="address"
                        inputText="Address"
                        inputId="address"
                        inputName="address"
                        defaultValue={userAddressInfo.address}
                        required
                        error={getErrorForField('address')}
                    />
                    <SubmitButton pendingText="Updating..." buttonText="UPDATE ADDRESS" />
                    {/* Display feedback message */}
                    <p
                        aria-live="polite"
                        className="sr-o text-red-600 text-center"
                        role="status"
                    >
                        {state.message} {state.error}
                    </p>
                </form>

            </>)}

        </>
    )
}