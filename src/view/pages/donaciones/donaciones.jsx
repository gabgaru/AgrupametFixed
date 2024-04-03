import { useState } from 'react';
import { PayPalButton } from 'react-paypal-button-v2';
import Header2 from "../../components/Header2/Header2";
import Footer2 from "../../components/footer2/footer2";
import university from '../../assets/university.jpeg';
import CustomInput from '../../components/form/form'
import billete_icon from '../../assets/billete.svg';
import "./donaciones.css";

const Donations = () => {
  const paypalOptions = {
    clientId: 'Aev7o-XHnalniEPgsR5N5QsDkUkIp7glV8f661Tomw-iGzn0F_wIpPV758DSbf8D5nS9IffBpSMFTgA5',
    currency: 'USD',
  };

  const [donationAmount, setDonationAmount] = useState('');
  const [isValidAmount, setIsValidAmount] = useState(false);
  const [error, setError] = useState('');
  const [donationSuccess, setDonationSuccess] = useState(false);

  const onSuccess = (details, data) => {
    console.log("Donación exitosa", details);
    setDonationSuccess(true);
    setError('');
    setIsValidAmount(false);
  };

  const onError = (err) => {
    console.error("Error en la donación", err);
  };

  const handleAccept = () => {
    const value = document.getElementById('monto').value;
    const isValidNumber = /^\d+(\.\d{1,2})?$/.test(value);
    const isValidRange = value >= 0.01 && value < 1000000;
    const isValidDecimalSeparator = value.indexOf('.') === value.lastIndexOf('.');

    if (!isValidNumber || !isValidRange || !isValidDecimalSeparator) {
      setError("El monto ingresado no es válido. El monto mínimo es de 0.01 y el máximo es de 999999.99. Asegúrese de usar el punto como separador decimal y no escriba más de dos números decimales.");
      setIsValidAmount(false);
    } else {
      setError('');
      setDonationAmount(value);
      setIsValidAmount(true);
    }
  };

  const handleCloseModal = () => {
    setDonationSuccess(false);
  };

  return (
    <div>
      <Header2 />
      <div className="imagen">
        <img className='foto' src={university} alt="Universidad"></img>
        <h1 className="title">Donaciones</h1>
      </div>
      <div className="contenedor_donaciones">
        <p className="texto">Tu apoyo es vital para nuestras agrupaciones estudiantiles. Con tus donaciones, impulsamos programas y servicios que enriquecen la experiencia de nuestra comunidad unimetana. Cada aporte, sin importar su magnitud, tiene un impacto significativo. ¡Únete y haz la diferencia hoy mismo!</p>
        {!donationSuccess && <span style={{ color: 'black', fontSize: '40px', textAlign: 'center', marginTop: "0px" }}>¡Realiza una <span style={{ color: '#FD8204', fontSize: '40px', textAlign: 'center' }}>donación<span style={{ color: 'black', fontSize: '40px', textAlign: 'center', marginBottom: '0px' }}>!</span></span></span>}
        <div className="donaciones_form">
          {!donationSuccess && <CustomInput
            id="monto"
            label={"Monto"}
            preffixIcon={<img src={billete_icon} alt="icon" />}
            required={true}
            type={"text"}
            placeholder={"Ingrese el monto que desea donar..."}
          />}
          {!donationSuccess && <button type="button" className="send" onClick={handleAccept}>
            Confirmar monto
          </button>}
          {error && <p style={{ color: 'red', textAlign: 'justify', marginTop: '-10px' }}>{error}</p>}
          {isValidAmount && <p style={{ color: 'green', textAlign: 'center', marginBottom: '30px', marginTop: '-10px' }}>¡Monto válido!</p>}
        </div>

        {isValidAmount && !donationSuccess && (
          <PayPalButton
            amount={donationAmount}
            options={paypalOptions}
            onSuccess={onSuccess}
            onError={onError}
            onClick={handleAccept}
          />
        )}

        {donationSuccess && (
          <div>
            <div>
              <span style={{ color: 'black', fontSize: '40px', textAlign: 'center' }}>¡Donación <span style={{ color: '#FD8204', fontSize: '40px', textAlign: 'center' }}>exitosa<span style={{ color: 'black', fontSize: '40px', textAlign: 'center', marginBottom: '0px' }}>!</span></span></span>
              <h3 style={{ textAlign: 'center' }}>¡Gracias por tu generosidad!</h3>
              <button type="button" className="send" onClick={handleCloseModal}>Cerrar</button>
            </div>
          </div>
        )}

      </div>
      <Footer2 />
    </div>
  );
};

export default Donations;
