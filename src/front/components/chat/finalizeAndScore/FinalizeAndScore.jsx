import { useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
//import { deletePost } from "../../../services/postApi";
import ScoreManager from "../../ScoreManager";
import "./finalize-and-score.css";

export default function FinalizeAndScore({ postId, postOwnerId, onPostHidden }) {
    const { user, token } = useAuth();
    const [showRate, setShowRate] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    if (!user || user.id !== postOwnerId) return null;

    const handleFinalize = async () => {
        const confirm = await Swal.fire({
            icon: "warning",
            title: "¿Estás seguro de realizar la transaccion?",
            showCancelButton: true,
            confirmButtonText: "Sí, realizar",
            cancelButtonText: "Cancelar",
            reverseButtons: true,
        });
        if (!confirm.isConfirmed) return;

        setLoading(true);

        Swal.fire({
            title: "Procesando...",
            html: `<p class="finalize__text">Realizando transaccion...</p>`,
            allowOutsideClick: false,
            didOpen: () => Swal.showLoading(),
        });

        try {

           // await deletePost(postId, token);
            onPostHidden?.(postId);

            Swal.close();
            setShowRate(true);
        } catch (e) {
            console.error(e);
            Swal.close();
            await Swal.fire({
                icon: "error",
                title: "No se pudo realizar la transaccion",
                html: `<p class="finalize__text">${e?.message || "Inténtalo de nuevo en unos segundos."
                    }</p>`,
            });
        } finally {
            setLoading(false);
        }
    };

    const handleCloseRate = async () => {
        setShowRate(false);

        await Swal.fire({
            icon: "success",
            title: "¡Transaccion realizada!",
            html: `<p class="finalize__text">Tu valoración ha sido registrada correctamente.</p>`,
            timer: 2200,
            showConfirmButton: false,
            timerProgressBar: true,
        });

        navigate("/posts");
    };

    return (
        <>
            <button
                className="btn-primary finalize__btn"
                onClick={handleFinalize}
                disabled={loading}
                title="Transaccion realizada"
            >
                {loading ? "Procesando…" : "Transaccion realizada"}
            </button>

            {showRate && (
                <div className="rate-modal" role="dialog" aria-modal="true">
                    <div className="rate-modal__card">
                        <div className="rate-modal__header">
                            <h3>Valora tu experiencia</h3>
                            <button
                                type="button"
                                className="rate-modal__close"
                                aria-label="Cerrar"
                                onClick={handleCloseRate}
                            >
                                ✕
                            </button>
                        </div>

                        <p className="finalize__hint">
                            Usa las estrellas para guardar tu puntuación.
                        </p>

                        <ScoreManager />

                        <div className="rate-modal__footer">
                            <button
                                type="button"
                                className="rate-modal__dismiss"
                                onClick={handleCloseRate}
                            >
                                Cerrar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
