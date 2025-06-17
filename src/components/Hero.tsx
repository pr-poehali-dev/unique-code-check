import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

const Hero = () => {
  return (
    <section className="bg-gradient-to-br from-purple-50 via-white to-indigo-50 py-20">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl mb-6 shadow-lg">
            <span className="text-3xl">🔐</span>
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Проверка уникальных
            <br />
            <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
              кодов
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Быстрая и надежная верификация кодов через Digiseller API. Проверьте
            подлинность вашего кода за секунды.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <Link to="/check-code">
            <Button
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-8 py-3 text-lg shadow-lg"
            >
              <Icon name="Search" className="mr-2" size={20} />
              Проверить код
            </Button>
          </Link>
          <Link to="/instructions">
            <Button
              variant="outline"
              size="lg"
              className="border-purple-200 text-purple-700 hover:bg-purple-50 px-8 py-3 text-lg"
            >
              <Icon name="BookOpen" className="mr-2" size={20} />
              Инструкция
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
              <Icon name="Zap" className="text-purple-600" size={24} />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Быстро</h3>
            <p className="text-gray-600 text-sm">
              Проверка кода занимает всего несколько секунд
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
              <Icon name="Shield" className="text-indigo-600" size={24} />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Надежно</h3>
            <p className="text-gray-600 text-sm">
              Прямая интеграция с официальным API Digiseller
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
              <Icon name="CheckCircle" className="text-green-600" size={24} />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Просто</h3>
            <p className="text-gray-600 text-sm">
              Интуитивно понятный интерфейс для всех пользователей
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
