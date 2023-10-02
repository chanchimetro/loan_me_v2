import React from "react";

/*
{
            "id": 0,
            "monto": 2521412,
            "fechaCreacion": "no se bien el formato",
            "interes": 22.5,
            "plazoPago": "no se bien el formato x2",
            "intervaloPago": "String. formato a cambiar?",
            "riesgo": 50
        }
*/

export default function LoanCard({info}) {
    return (
        <div class="card">
            <div class="card-header">
                {info.fechaCreacion}
            </div>
            <div class="card-body">
                <h5 class="card-title">{info.monto}</h5>
                <p class="card-text"></p>
            </div>
        </div>
    );
}