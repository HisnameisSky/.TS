const { useState, useEffect, useRef } = React;

export const OTPGenerator = () => {
  const [otp, setOtp] = useState('');
  const [timeLeft, setTimeLeft] = useState(0);
  const [isActive, setIsActive] = useState(false);

  // 6桁のOTPを生成してカウントダウンを開始する
  const generateOTP = () => {
    // 100000 〜 999999 の範囲で6桁のランダムな数字を生成
    const newOtp = Math.floor(100000 + Math.random() * 900000).toString();
    setOtp(newOtp);
    setTimeLeft(5);
    setIsActive(true);
  };

  // タイマー処理（useEffect）
  useEffect(() => {
    let interval = null;

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0 && isActive) {
      setIsActive(false);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, timeLeft]);

  // タイマー表示テキストの判定
  const renderTimerText = () => {
    if (timeLeft === 0 && !otp) {
      return ''; // 初期状態は空
    }
    if (timeLeft > 0) {
      return `Expires in: ${timeLeft} seconds`;
    }
    return 'OTP expired. Click the button to generate a new OTP.';
  };

  return (
    <div className="container">
      <h1 id="otp-title">OTP Generator</h1>
      <h2 id="otp-display">
        {otp ? otp : "Click 'Generate OTP' to get a code"}
      </h2>
      <p id="otp-timer" aria-live="polite">
        {renderTimerText()}
      </p>
      <button
        id="generate-otp-button"
        onClick={generateOTP}
        disabled={isActive}
      >
        Generate OTP
      </button>
    </div>
  );
};

//

const [count,setCount]=useState(0);

useEffect(()=>{
    //
},[])

