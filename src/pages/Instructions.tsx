import Navigation from "@/components/Navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Icon from "@/components/ui/icon";

const Instructions = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Инструкция по использованию
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Подробное руководство по проверке уникальных кодов и работе с нашим
            сервисом
          </p>
        </div>

        <div className="grid gap-8 mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="PlayCircle" size={24} />
                Пошаговая инструкция
              </CardTitle>
              <CardDescription>
                Как проверить код за 3 простых шага
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center font-bold">
                    1
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">
                      Получите код
                    </h3>
                    <p className="text-gray-600">
                      После покупки продукта вы получите уникальный код от
                      продавца. Код обычно состоит из букв и цифр (например:
                      ABC123DEF456).
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center font-bold">
                    2
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">
                      Введите код
                    </h3>
                    <p className="text-gray-600">
                      Перейдите на страницу "Проверка кода" и введите полученный
                      код в поле для ввода. Убедитесь, что код введен без
                      ошибок.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center font-bold">
                    3
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">
                      Получите результат
                    </h3>
                    <p className="text-gray-600">
                      Нажмите кнопку "Проверить код" и получите детальную
                      информацию о продукте, продавце и статусе кода.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="Info" size={24} />О сервисе
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none">
              <p className="text-gray-600">
                Наш сервис использует официальный API Digiseller для проверки
                подлинности уникальных кодов. Это гарантирует достоверность
                информации и защиту от мошенничества.
              </p>
              <p className="text-gray-600">
                Система работает в режиме реального времени и предоставляет
                актуальную информацию о статусе кода, продукте и продавце.
              </p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon name="HelpCircle" size={24} />
              Часто задаваемые вопросы
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>
                  Что делать, если код не найден?
                </AccordionTrigger>
                <AccordionContent>
                  Если код не найден, проверьте правильность ввода. Убедитесь,
                  что код скопирован полностью и без лишних пробелов. Если
                  проблема сохраняется, обратитесь к продавцу.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2">
                <AccordionTrigger>
                  Сколько раз можно проверить один код?
                </AccordionTrigger>
                <AccordionContent>
                  Код можно проверять неограниченное количество раз. Однако,
                  если код уже был использован, система покажет соответствующий
                  статус.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3">
                <AccordionTrigger>
                  Безопасно ли вводить код на сайте?
                </AccordionTrigger>
                <AccordionContent>
                  Да, наш сервис использует защищенное соединение и не сохраняет
                  введенные коды. Вся информация передается напрямую в API
                  Digiseller для проверки.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4">
                <AccordionTrigger>
                  Что означают разные статусы кода?
                </AccordionTrigger>
                <AccordionContent>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>
                      <strong>Активен</strong> - код действителен и может быть
                      использован
                    </li>
                    <li>
                      <strong>Использован</strong> - код уже был активирован
                      ранее
                    </li>
                    <li>
                      <strong>Недействителен</strong> - код не найден в системе
                      или истек
                    </li>
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5">
                <AccordionTrigger>
                  Как долго код остается действительным?
                </AccordionTrigger>
                <AccordionContent>
                  Срок действия кода зависит от условий, установленных
                  продавцом. Обычно коды действительны в течение длительного
                  времени, но рекомендуется использовать их как можно скорее
                  после покупки.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Instructions;
