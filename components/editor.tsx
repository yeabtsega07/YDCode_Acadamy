"use client"

import dynamic from "next/dynamic";
import { useMemo } from "react";

import "react-quill/dist/quill.snow.css";

interface EditorProps {
    value: string;
    onChange: (value: string) => void;
    };


export const Editor = ({
    onChange, 
    value,
}: EditorProps) => {

    const ReactQuill =  useMemo(() => dynamic(() => import("react-quill"), { ssr: false }), []);

    return (
        <div className="bg-white dark:bg-slate-300">
            <ReactQuill
                theme="snow"
                value={value}
                onChange={onChange}
                className="dark:text-slate-900"
            /> 
        </div>
    )
};