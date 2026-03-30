"use client";
import { useState, useEffect, useRef } from "react";

// ui
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "./ui/button";

export function Pomodoro() {
    const [tempo, setTempo] = useState(25 * 60);
    const [estaRodando, setEstaRodando] = useState(false);
    const [modo, setModo] = useState("foco");
    const [ciclos, setCiclos] = useState(0);


    const inicioRef = useRef(null);
    const tempoAoIniciarRef = useRef(25 * 60);

    useEffect(() => {
        if (!estaRodando) return;

     
        inicioRef.current = Date.now();
        tempoAoIniciarRef.current = tempo;

        const intervalo = setInterval(() => {
            const decorrido = Math.floor((Date.now() - inicioRef.current) / 1000);
            const novoTempo = tempoAoIniciarRef.current - decorrido;

            if (novoTempo <= 0) {
                clearInterval(intervalo);
                setTempo(0);
                handleTemporizadorAcaba();
                return;
            }

            setTempo(novoTempo);
        }, 500); 

        return () => clearInterval(intervalo);
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
    };

    const formatarTempo = () => {
        const minutos = Math.floor(tempo / 60).toString().padStart(2, "0");
        const segundos = (tempo % 60).toString().padStart(2, "0");
        return `${minutos}:${segundos}`;
    };

    const handleResetar = () => {
        setEstaRodando(false);
        setTempo(modo === "foco" ? 25 * 60 : 5 * 60);
    };

    return (
        <div>
            <Card>
                <CardHeader>
                    <CardTitle>{modo === "foco" ? "Modo foco" : "Pausa"}</CardTitle>
                    <CardDescription>Tempo restante</CardDescription>
                    <h1 className="text-8xl">{formatarTempo()}</h1>
                </CardHeader>
                <CardContent className="flex flex-row gap-4">
                    <Button variant="secondary" onClick={() => setEstaRodando(!estaRodando)}>
                        {estaRodando ? "Pausa" : "Iniciar"}
                    </Button>
                    <Button variant="secondary" onClick={handleResetar}>Resetar</Button>
                </CardContent>
                <CardFooter>
                    <p>Pomodoros concluídos: {ciclos}</p>
                </CardFooter>
            </Card>
        </div>
    );
}