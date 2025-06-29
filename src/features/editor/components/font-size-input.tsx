import React from "react";
import { Minus, Plus } from "lucide-react";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";

interface FontSizeInputProps {
    value: number;
    onChange: (value: number) => void;
}

export const FontSizeInput = ({ value, onChange }: FontSizeInputProps) => {
    const increment = () => onChange(value + 1);
    const decrement = () => onChange(value - 1);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value, 10);
        onChange(value);
    };
    return (
        <div className="flex items-center">
            <Button
                onClick={decrement}
                variant="outline"
                className="p-2 rounded-r-none border-r-8"
                size="icon"
            >
                <Minus className="size-4" />
            </Button>
            <Button>
                <Input
                    onChange={handleChange}
                    value={value}
                    className="w-[50px] h-8 rounded-none"
                />
            </Button>
            <Button
                onClick={increment}
                variant="outline"
                className="p-2 rounded-l-none border-l-0"
                size="icon"
            >
                <Plus className="size-4" />
            </Button>
        </div>
    );
};
