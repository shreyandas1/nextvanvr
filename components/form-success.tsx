import { CheckCircledIcon } from "@radix-ui/react-icons";

interface FormSuccessProps {
    message?: string;
}

export const FormSuccess = ({
    message 
}: FormSuccessProps) => {
    if (!message) return null

    return (
        <div>
            <CheckCircledIcon />
            <p> {message} </p>
        </div>
    )
}