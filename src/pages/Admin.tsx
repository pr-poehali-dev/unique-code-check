import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { OrderStats } from "@/types/order";
import { database } from "@/services/database";

const Admin = () => {
  const [stats, setStats] = useState<OrderStats>({
    total: 0,
    processing: 0,
    completed: 0,
    error: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const orderStats = await database.getOrderStats();
      setStats(orderStats);
    } catch (error) {
      console.error("Error loading stats:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const adminSections = [
    {
      path: "/admin/orders",
      title: "Все заказы",
      description: "Управление всеми заказами",
      icon: "FileText",
      count: stats.total,
      color: "bg-blue-500",
    },
    {
      path: "/admin/processing",
      title: "В обработке",
      description: "Заказы в процессе проверки",
      icon: "Clock",
      count: stats.processing,
      color: "bg-yellow-500",
    },
    {
      path: "/admin/completed",
      title: "Выполненные",
      description: "Успешно обработанные заказы",
      icon: "CheckCircle",
      count: stats.completed,
      color: "bg-green-500",
    },
    {
      path: "/admin/errors",
      title: "Ошибки",
      description: "Заказы с ошибками",
      icon: "AlertCircle",
      count: stats.error,
      color: "bg-red-500",
    },
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="flex items-center justify-center h-96">
          <Icon name="Loader2" className="animate-spin" size={32} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Панель администратора
          </h1>
          <p className="text-gray-600">
            Управление заказами и мониторинг системы
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {adminSections.map((section) => (
            <Card
              key={section.path}
              className="hover:shadow-lg transition-shadow"
            >
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div
                      className={`p-2 rounded-lg ${section.color} text-white`}
                    >
                      <Icon name={section.icon as any} size={20} />
                    </div>
                    <span className="text-lg">{section.title}</span>
                  </div>
                  <span className="text-2xl font-bold text-gray-900">
                    {section.count}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm mb-4">
                  {section.description}
                </p>
                <Link to={section.path}>
                  <Button className="w-full" variant="outline">
                    Перейти
                    <Icon name="ArrowRight" className="ml-2" size={16} />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="Activity" size={20} />
                Быстрые действия
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full justify-start" variant="outline">
                <Icon name="RefreshCw" className="mr-2" size={16} />
                Обновить все статистики
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Icon name="Download" className="mr-2" size={16} />
                Экспорт данных
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Icon name="Settings" className="mr-2" size={16} />
                Настройки системы
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="TrendingUp" size={20} />
                Статистика
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Успешная обработка:</span>
                  <span className="font-semibold">
                    {stats.total > 0
                      ? Math.round((stats.completed / stats.total) * 100)
                      : 0}
                    %
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">В процессе:</span>
                  <span className="font-semibold">
                    {stats.total > 0
                      ? Math.round((stats.processing / stats.total) * 100)
                      : 0}
                    %
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Ошибки:</span>
                  <span className="font-semibold">
                    {stats.total > 0
                      ? Math.round((stats.error / stats.total) * 100)
                      : 0}
                    %
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Admin;
