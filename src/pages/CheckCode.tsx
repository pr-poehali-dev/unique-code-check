import { useState } from "react";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Icon from "@/components/ui/icon";

const CheckCode = () => {
  const [code, setCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim()) return;

    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      // Имитация API запроса (замените на реальный API)
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Пример результата
      const mockResult = {
        valid: Math.random() > 0.3,
        product: "Цифровой продукт",
        seller: "Продавец123",
        purchaseDate: new Date().toLocaleDateString("ru-RU"),
        status: Math.random() > 0.3 ? "active" : "used",
      };

      setResult(mockResult);
    } catch (err) {
      setError("Ошибка при проверке кода. Попробуйте позже.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <div className="max-w-2xl mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Проверка кода
          </h1>
          <p className="text-gray-600">
            Введите уникальный код для проверки его подлинности
          </p>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon name="Search" size={20} />
              Форма проверки
            </CardTitle>
            <CardDescription>
              Введите код, полученный от продавца
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Input
                  type="text"
                  placeholder="Введите код (например: ABC123DEF456)"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="text-lg py-3"
                  disabled={isLoading}
                />
              </div>
              <Button
                type="submit"
                disabled={!code.trim() || isLoading}
                className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
                size="lg"
              >
                {isLoading ? (
                  <>
                    <Icon
                      name="Loader2"
                      className="mr-2 animate-spin"
                      size={20}
                    />
                    Проверяем...
                  </>
                ) : (
                  <>
                    <Icon name="Search" className="mr-2" size={20} />
                    Проверить код
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {error && (
          <Alert className="mb-6 border-red-200 bg-red-50">
            <Icon name="AlertCircle" className="text-red-600" size={16} />
            <AlertDescription className="text-red-800">
              {error}
            </AlertDescription>
          </Alert>
        )}

        {result && (
          <Card
            className={`border-2 ${result.valid ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"}`}
          >
            <CardHeader>
              <CardTitle
                className={`flex items-center gap-2 ${result.valid ? "text-green-800" : "text-red-800"}`}
              >
                <Icon
                  name={result.valid ? "CheckCircle" : "XCircle"}
                  size={24}
                />
                {result.valid ? "Код действителен" : "Код недействителен"}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium text-gray-700">Продукт:</span>
                  <p className="text-gray-900">{result.product}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Продавец:</span>
                  <p className="text-gray-900">{result.seller}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-700">
                    Дата покупки:
                  </span>
                  <p className="text-gray-900">{result.purchaseDate}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Статус:</span>
                  <p
                    className={`font-medium ${result.status === "active" ? "text-green-600" : "text-orange-600"}`}
                  >
                    {result.status === "active" ? "Активен" : "Использован"}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default CheckCode;
