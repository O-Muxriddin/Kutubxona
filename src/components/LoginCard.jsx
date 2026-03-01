import { GithubIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginCard() {
  const navigate = useNavigate();

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [debugInfo, setDebugInfo] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/");
    }
  }, [navigate]);

  const handleLogin = async () => {
    if (!login.trim() || !password.trim()) {
      setError("Login va parolni kiriting");
      return;
    }

    setError("");
    setLoading(true);
    setDebugInfo("");

    try {
      console.log("Sending request with:", { login, password }); 

      const res = await fetch(
        "https://json-api.uz/api/project/chizmachilik/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            username: login.trim(),
            password: password.trim(),
          }),
        },
      );

      console.log("Response status:", res.status);

      const responseText = await res.text();
      console.log("Raw response:", responseText);

      let data;
      try {
        data = JSON.parse(responseText);
      } catch (e) {
        console.error("JSON parse error:", e);
        setError("Serverdan noto'g'ri formatda javob keldi");
        // setDebugInfo(
        //   `Status: ${res.status}, Response: ${responseText.substring(0, 100)}`,
        // );
        setLoading(false);
        return;
      }

      if (!res.ok) {
        setError(data.message || "Login yoki parol noto‘g‘ri");
        setLoading(false);
        return;
      }

      if (data.token) {
        localStorage.setItem("token", data.token);
      } else if (data.access_token) {
        localStorage.setItem("token", data.access_token);
      } else if (data.data?.token) {
        localStorage.setItem("token", data.data.token);
      } else {
        setError("Serverdan token kelmadi");
        setDebugInfo(
          "Token topilmadi. Response strukturasi: " + JSON.stringify(data),
        );
        setLoading(false);
        return;
      }

      if (data.user) {
        localStorage.setItem("user", JSON.stringify(data.user));
      } else if (data.data?.user) {
        localStorage.setItem("user", JSON.stringify(data.data.user));
      }

      navigate("/"); 
    } catch (err) {
      console.error("Login error:", err);
      setError("Server bilan bog'lanishda xatolik");
      setDebugInfo(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !loading) {
      handleLogin();
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <Card className="w-full max-w-md p-8 text-black bg-white dark:bg-gray-800 shadow-lg rounded-xl">
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            Tizimga kirish
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-sm">
            Profilingizga kirish uchun login va parolingizni kiriting
          </p>
        </div>

        <CardContent>
          <div className="flex w-full flex-col gap-4">
            <div>
              <label className="text-sm font-medium mb-1 block">Login</label>
              <Input
                placeholder="Loginingizni kiriting"
                value={login}
                onChange={(e) => setLogin(e.target.value)}
                onKeyPress={handleKeyPress}
                disabled={loading}
                autoFocus
                className="w-full"
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-1 block">Parol</label>
              <Input
                placeholder="Parolingizni kiriting"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={handleKeyPress}
                disabled={loading}
                className="w-full"
              />
            </div>
          </div>

          {error && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md">
              <p className="text-red-600 text-sm text-center">{error}</p>
              {debugInfo && (
                <p className="text-xs text-gray-500 mt-2 break-all">
                  Debug: {debugInfo}
                </p>
              )}
            </div>
          )}
        </CardContent>

        <CardFooter className="flex w-full flex-col gap-3 mt-4">
          <Button
            className="w-full h-11"
            onClick={handleLogin}
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                Kutilmoqda...
              </span>
            ) : (
              "Kirish"
            )}
          </Button>

          <a
            href="https://github.com/O-Muxriddin"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full"
          >
            <Button
              className="w-full gap-4 bg-gray-800 hover:bg-gray-700 text-white h-11"
              variant="secondary"
              disabled={loading}
            >
              <GithubIcon className="size-4" />
              GitHub orqali kirish
            </Button>
          </a>
        </CardFooter>
      </Card>
    </div>
  );
}
