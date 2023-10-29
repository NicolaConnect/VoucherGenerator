import React from "react";
import WiFiTag from "../../images/wifi.svg";
import axios from "axios";

export default function Home() {
    const [code, setCode] = React.useState(null);
    const [generating, setGenerating] = React.useState(false);
    const [codeType, setCodeType] = React.useState(null);
    const [error, setError] = React.useState(null);

    const generate15MinutesCode = (e) => {
        e.preventDefault();

        setCodeType('15-minutes');
        setGenerating(true);
        setError(null);

        axios.post('/api/generate', {
            type: '15-minutes'
        }).then(response => {
            setCode(response.data.code);
        }).catch(error => {
            setError("Si è verificato un errore. Riprova o contatta un tecnico.");
        }).finally(() => {
            setGenerating(false);
        });
    }

    const generate60MinutesCode = (e) => {
        e.preventDefault();

        setCodeType('60-minutes');
        setGenerating(true);
        setError(null);

        axios.post('/api/generate', {
            type: '60-minutes'
        }).then(response => {
            setCode(response.data.code);
        }).catch(error => {
            setError("Si è verificato un errore. Riprova o contatta un tecnico.");
        }).finally(() => {
            setGenerating(false);
        });
    }

    return <div className="min-w-screen min-h-screen bg-gray-100 flex items-center justify-center px-5 py-5">
        <div className="bg-white text-gray-500 rounded-xl shadow-xl w-full max-w-md overflow-hidden p-4">
            {
                ! generating && ! code && <>
                    {
                        error && <div className="px-3 py-2 rounded-lg bg-red-50 border border-red-200 text-red-800 mb-4">
                            <p className="text-sm font-semibold">Attenzione!</p>
                            <p className="text-sm">
                                {error}
                            </p>
                        </div>
                    }

                    Scegli quale codice generare. Ricorda che il codice verrà mostrato una sola volta.

                    <div className="mt-4 space-y-2">
                        <button type="button" onClick={generate15MinutesCode} className="rounded-md bg-gray-700 px-3.5 py-2.5 w-full text-sm font-semibold text-white shadow-sm hover:bg-gray-900">
                            15 minuti
                        </button>
                        <button type="button" onClick={generate60MinutesCode} className="rounded-md bg-gray-700 px-3.5 py-2.5 w-full text-sm font-semibold text-white shadow-sm hover:bg-gray-900">
                            60 minuti
                        </button>
                    </div>
                </>
            }

            {
                generating && ! code && <>
                    <div className="text-center">
                        <svg className="animate-spin h-8 w-8 mx-auto" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                        </svg>

                        <p className="text-sm text-gray-500 mt-2">Sto generando il codice...</p>
                    </div>
                </>
            }

            {
                code && <>
                    <div className="text-center">
                        <img src={WiFiTag} className="h-48 w-48 mx-auto" alt="Wi-Fi Tag" />
                        <p className="text-sm text-gray-500 mt-8">Il codice valido per { codeType === "15-minutes" ? "15 minuti" : "60 minuti" } è:</p>
                        <p className="text-2xl font-semibold">{code}</p>
                    </div>

                    <div className="mt-4">
                        <button type="button" onClick={(e) => {
                            e.preventDefault();

                            setCode(null);
                            setGenerating(false);
                            setCodeType(null);
                        }} className="rounded-md bg-gray-700 px-3.5 py-2.5 w-full text-sm font-semibold text-white shadow-sm hover:bg-gray-900">
                            Reset
                        </button>
                    </div>
                </>
            }
        </div>
    </div>;
}
