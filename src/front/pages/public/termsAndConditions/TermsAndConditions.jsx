import "./terms-and-conditions.css"

export const TermsAndConditions = () => {
  return (
    <section className="terms-wrapper">
      <div className="terms-container">
        <article className="terms-content">
          <h1 className="terms-title">Términos y Condiciones de Uso</h1>
          <p className="terms-updated"><strong>Última actualización:</strong> 24 de noviembre de 2025</p>
          <p><strong>Plataforma:</strong> <span className="highlight">First Exchange</span></p>

          <h2>1. Objeto del Servicio</h2>
          <p>
            First Exchange es una plataforma digital financiera cuyo propósito es el intercambiar divisas de forma particular,empresarial, institucional.
            First Exchange realiza intermediación financiera, ejecuta y procesa transacciones monetarias, actúa como casa de cambio, o entidad autorizada.
          </p>

          <h2>2. Condiciones de Uso</h2>
          <ul>
            <li>El uso de la plataforma implica aceptación total de estos términos.</li>
            <li>Solo usuarios mayores de 18 años pueden registrarse.</li>
            <li>El usuario es responsable de la información que proporciona y de los acuerdos que celebre con otros usuarios.</li>
          </ul>

          <h2>3. Naturaleza del Servicio</h2>
          <p>
            First Exchange gestiona, verifica, valida los intercambios de divisa, ya que actúa como intermediario.
            Las herramientas informativas disponibles son meramente orientativas, cada quien invierte bajo su propio riezgo.
          </p>

          <h2>4. Limitación de Responsabilidad</h2>
          <p>
            First Exchange no asume responsabilidad por pérdidas económicas, conflictos, ni incidentes ocurridos como resultado del uso de la plataforma.
            Todo uso se realiza bajo exclusiva responsabilidad del usuario.
          </p>

          <h2>5. Suspensión o Eliminación de Cuentas</h2>
          <p>
            Se podrá suspender o eliminar una cuenta ante conductas sospechosas, fraudulentas, o que violen estos términos.
          </p>

          <h2>6. Protección de Datos</h2>
          <p>
            Cumplimos con el Reglamento General de Protección de Datos (RGPD). Consulta nuestra Política de Privacidad para más información.
            Puedes ejercer tus derechos escribiendo a <a href="mailto:privacidad@first.exchange">privacidad@first.exchange</a>.

          </p>

          <h2>7. Modificaciones</h2>
          <p>
            Nos reservamos el derecho de modificar estos términos. El uso continuado implica la aceptación de los cambios.
          </p>

          <h2>8. Legislación Aplicable</h2>
          <p>
            Estos términos se rigen por la legislación internacional con atención especial a la normativa europea.
            En caso de disputa, se aplicará la jurisdicción correspondiente dentro del Espacio Económico Europeo (EEE).
          </p>

          <h2>9. Contacto</h2>
          <p>
            Para cualquier consulta, puedes escribirnos a <a href="mailto:contacto@First.exchange">contacto@first.exchange</a>.
          </p>
        </article>

        <aside className="terms-warning">
          <strong>Advertencia:</strong> First Exchange es una entidad financiera, está autorizada como proveedor de servicios de pago.
          Es responsabilidad del usuario cumplir con la normativa aplicable en materia de cambio de divisas.
        </aside>
      </div>
    </section>
  );
};

