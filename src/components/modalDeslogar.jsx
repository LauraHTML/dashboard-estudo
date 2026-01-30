"use client"
import useAuth from "@/hooks/useAuth"

import { useState } from "react"
import { FieldGroup, Field, FieldDescription, FieldLabel } from "@/components/ui/field"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
import { Button } from "./ui/button"
import { UserRoundPen, Target } from "lucide-react"

export function ModalInicial() {
  const [aberto, setAberto] = useState(true)

  if (!aberto) return null

  const { user, loading } = useAuth();

  if(!loading && user){
//usuario logado
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-titulo"
    >
      {/* Fundo borrado + escurecido */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-md"
        aria-hidden="true"
      />
      {/* Conteúdo do modal */}
      <div className="relative z-10 w-full max-w-sm rounded-xl border border-border bg-background p-6 shadow-xl">
        <h2 id="modal-titulo" className="sr-only">
          Tem certeza que quer sair?
        </h2>
        <FieldGroup className="w-full">
          <Field>
            <Button type="button" onClick={() => setAberto(false)}>
              Terminar estudos
            </Button>
          </Field>
        </FieldGroup>
      </div>
      { loading ? <h1>Loading...</h1> : <h1>aaaaa</h1>}
    </div>
  )
}
