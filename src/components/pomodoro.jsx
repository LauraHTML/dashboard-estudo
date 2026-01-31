"use client";
import { useState, useEffect } from "react";

//ui
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "./ui/button";

export function Pomodoro() {
    const [tempo, setTempo] = useState(25 * 60);
    const [estaRodando, setEstaRodando] = useState(false);
    const [modo, setModo] = useState("foco");
    const [ciclos, setCiclos] = useState(0);

    useEffect(() => {
        let temporizador;

        if (estaRodando) {
            temporizador = setInterval(() => {
                setTempo((prev) => {
                    if (prev === 1) {
                        handleTemporizadorAcaba();
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000)
        }
        return () => clearInterval(temporizador);
    }, [estaRodando]);

    const handleTemporizadorAcaba = () => {
        setEstaRodando(false);
        if (modo === "foco") {
            setModo("pausa");
            setTempo(5 * 60);
        } else {
            setModo("foco");
            setTempo(25 * 60);
            setCiclos((c) => c + 1);
        }
    }

    const formatarTempo = () => {
        const minutos = Math.floor(tempo / 60)
            .toString()
            .padStart(2, "0");
        const secundos = (tempo % 60).toString().padStart(2, "0");
        return `${minutos}:${secundos}`
    }

    const handleResetar = () => {
        setEstaRodando(false);
        setTempo(modo === "foco" ? 25 * 60 : 5 * 60);
    }

    return (<>
        <div>
            <Card>
                <CardHeader>
                    <CardTitle>Modo foco</CardTitle>
                    <CardDescription>Tempo restante</CardDescription>
                    <h1 className="text-8xl">{formatarTempo()}</h1>
                </CardHeader>
                <CardContent className={"flex flex-row gap-4"}>
                    <Button variant="secondary" onClick={() => setEstaRodando(!estaRodando)}>{estaRodando ? "Pausa" : "Iniciar"}</Button>
                    <Button variant="secondary" onClick={handleResetar}>Resetar</Button>
                </CardContent>
                <CardFooter>
                    <p>Pomodoros concluídos: {ciclos}</p>
                </CardFooter>
            </Card>
        </div>
    </>)
}