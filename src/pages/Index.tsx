import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [selectedMaterial, setSelectedMaterial] = useState<string | null>(null);
  const [exerciseProgress, setExerciseProgress] = useState(0);
  const [completedExercises, setCompletedExercises] = useState<number[]>([]);
  const [currentTestQuestion, setCurrentTestQuestion] = useState(0);
  const [testAnswers, setTestAnswers] = useState<number[]>([]);
  const [testScore, setTestScore] = useState<number | null>(null);
  const [showCertificate, setShowCertificate] = useState(false);
  const [studentName, setStudentName] = useState('');
  const [certificateDate] = useState(new Date().toLocaleDateString('ru-RU', { year: 'numeric', month: 'long', day: 'numeric' }));

  const materials = [
    {
      id: 1,
      title: 'Структура научной статьи',
      description: 'Основные разделы и их назначение в медицинском исследовании',
      category: 'Основы',
      duration: '15 мин',
      content: 'Научная статья состоит из следующих разделов: Введение (актуальность, цели и задачи), Материалы и методы (описание выборки и процедур), Результаты (представление данных), Обсуждение (интерпретация результатов), Выводы (краткое резюме).'
    },
    {
      id: 2,
      title: 'Правила цитирования',
      description: 'Стили Vancouver и APA в медицинской литературе',
      category: 'Оформление',
      duration: '20 мин',
      content: 'Vancouver style используется в большинстве медицинских журналов. Цитаты нумеруются по порядку появления в тексте. Пример: Smith J, Jones M. Title of article. J Med. 2023;15(2):123-130.'
    },
    {
      id: 3,
      title: 'Медицинская терминология',
      description: 'Латинские термины и правила их использования',
      category: 'Терминология',
      duration: '25 мин',
      content: 'Используйте латинские термины правильно: in vivo (в живом организме), in vitro (в пробирке), per os (через рот), ad hoc (для конкретного случая). Всегда выделяйте курсивом.'
    },
    {
      id: 4,
      title: 'Статистические данные',
      description: 'Представление результатов и p-значений',
      category: 'Анализ',
      duration: '30 мин',
      content: 'Всегда указывайте p-значение, доверительные интервалы и размер выборки. Пример: средний возраст составил 45.3±12.1 лет (M±SD), p<0.05.'
    }
  ];

  const exercises = [
    {
      id: 1,
      title: 'Определите структуру статьи',
      question: 'В какой раздел следует поместить описание контрольной группы пациентов?',
      options: ['Введение', 'Материалы и методы', 'Результаты', 'Обсуждение'],
      correct: 1
    },
    {
      id: 2,
      title: 'Исправьте цитату',
      question: 'Найдите ошибку в цитате: "Иванов И.И., Петров П.П. Исследование диабета. Медицинский журнал. 2023. С. 45-50"',
      options: ['Нет номера тома', 'Неправильный формат года', 'Отсутствует DOI', 'Все верно'],
      correct: 0
    },
    {
      id: 3,
      title: 'Выберите корректную форму',
      question: 'Как правильно написать латинский термин "in vitro"?',
      options: ['In Vitro', 'in vitro (курсивом)', 'IN VITRO', 'In vitro (обычным)'],
      correct: 1
    }
  ];

  const finalTest = [
    {
      question: 'Какие разделы обязательны в структуре научной статьи?',
      options: ['Введение, Методы, Результаты, Обсуждение', 'Только Введение и Выводы', 'Аннотация и Список литературы', 'Методы и Приложения'],
      correct: 0
    },
    {
      question: 'В каком стиле цитирования нумеруют ссылки по порядку появления в тексте?',
      options: ['APA', 'Vancouver', 'Harvard', 'MLA'],
      correct: 1
    },
    {
      question: 'Как правильно оформить статистические данные в медицинской статье?',
      options: ['Только текстом', 'С указанием p-значения и доверительных интервалов', 'Без единиц измерения', 'Округлять до целых чисел'],
      correct: 1
    },
    {
      question: 'Что означает латинский термин "per os"?',
      options: ['Внутривенно', 'Через рот', 'Подкожно', 'Наружно'],
      correct: 1
    },
    {
      question: 'В какой раздел статьи помещают интерпретацию полученных результатов?',
      options: ['Введение', 'Материалы и методы', 'Результаты', 'Обсуждение'],
      correct: 3
    }
  ];

  const handleExerciseComplete = (exerciseId: number) => {
    if (!completedExercises.includes(exerciseId)) {
      const newCompleted = [...completedExercises, exerciseId];
      setCompletedExercises(newCompleted);
      setExerciseProgress((newCompleted.length / exercises.length) * 100);
    }
  };

  const handleTestAnswer = (answerIndex: number) => {
    const newAnswers = [...testAnswers, answerIndex];
    setTestAnswers(newAnswers);
    
    if (currentTestQuestion < finalTest.length - 1) {
      setCurrentTestQuestion(currentTestQuestion + 1);
    } else {
      const score = newAnswers.reduce((acc, answer, idx) => 
        answer === finalTest[idx].correct ? acc + 1 : acc, 0
      );
      setTestScore(score);
    }
  };

  const resetTest = () => {
    setCurrentTestQuestion(0);
    setTestAnswers([]);
    setTestScore(null);
  };

  const handleGetCertificate = () => {
    if (studentName.trim()) {
      setShowCertificate(true);
    }
  };

  const downloadCertificate = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between animate-fade-in">
            <div>
              <h1 className="text-3xl font-bold text-secondary mb-2">Научное письмо</h1>
              <p className="text-muted-foreground">Образовательная платформа для студентов медицинского вуза</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Ваш прогресс</p>
                <div className="flex items-center gap-2 mt-1">
                  <Progress value={exerciseProgress} className="w-32" />
                  <span className="text-sm font-semibold">{Math.round(exerciseProgress)}%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="materials" className="w-full">
          <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-3 mb-8">
            <TabsTrigger value="materials" className="flex items-center gap-2">
              <Icon name="BookOpen" size={18} />
              Материалы
            </TabsTrigger>
            <TabsTrigger value="exercises" className="flex items-center gap-2">
              <Icon name="PenTool" size={18} />
              Упражнения
            </TabsTrigger>
            <TabsTrigger value="test" className="flex items-center gap-2" disabled={completedExercises.length < exercises.length}>
              <Icon name="Award" size={18} />
              Тестирование
            </TabsTrigger>
          </TabsList>

          <TabsContent value="materials" className="animate-fade-in">
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-2">Учебные материалы</h2>
              <p className="text-muted-foreground">
                Изучите основы научного письма в медицине
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {materials.map((material, index) => (
                <Card 
                  key={material.id} 
                  className="hover:shadow-lg transition-all duration-300 cursor-pointer animate-scale-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                  onClick={() => setSelectedMaterial(selectedMaterial === material.id.toString() ? null : material.id.toString())}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <Badge variant="secondary">{material.category}</Badge>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Icon name="Clock" size={14} />
                        {material.duration}
                      </div>
                    </div>
                    <CardTitle className="text-xl">{material.title}</CardTitle>
                    <CardDescription>{material.description}</CardDescription>
                  </CardHeader>
                  {selectedMaterial === material.id.toString() && (
                    <CardContent className="animate-accordion-down">
                      <div className="p-4 bg-muted rounded-lg">
                        <p className="text-sm leading-relaxed">{material.content}</p>
                      </div>
                      <Button className="mt-4 w-full" variant="outline">
                        <Icon name="CheckCircle2" size={16} className="mr-2" />
                        Отметить как изученное
                      </Button>
                    </CardContent>
                  )}
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="exercises" className="animate-fade-in">
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-2">Практические упражнения</h2>
              <p className="text-muted-foreground">
                Проверьте свои знания и закрепите материал
              </p>
            </div>

            <div className="grid gap-6 max-w-3xl mx-auto">
              {exercises.map((exercise, index) => (
                <Card 
                  key={exercise.id}
                  className="animate-scale-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardHeader>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant={completedExercises.includes(exercise.id) ? "default" : "outline"}>
                        {completedExercises.includes(exercise.id) ? (
                          <><Icon name="Check" size={12} className="mr-1" /> Выполнено</>
                        ) : (
                          `Задание ${exercise.id}`
                        )}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg">{exercise.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-4 font-medium">{exercise.question}</p>
                    <div className="space-y-2">
                      {exercise.options.map((option, optIndex) => (
                        <Button
                          key={optIndex}
                          variant={completedExercises.includes(exercise.id) && optIndex === exercise.correct ? "default" : "outline"}
                          className="w-full justify-start text-left h-auto py-3"
                          onClick={() => {
                            if (optIndex === exercise.correct) {
                              handleExerciseComplete(exercise.id);
                            }
                          }}
                          disabled={completedExercises.includes(exercise.id)}
                        >
                          <span className="mr-2 font-bold">{String.fromCharCode(65 + optIndex)}.</span>
                          {option}
                          {completedExercises.includes(exercise.id) && optIndex === exercise.correct && (
                            <Icon name="CheckCircle2" size={18} className="ml-auto text-white" />
                          )}
                        </Button>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {completedExercises.length === exercises.length && (
              <Card className="mt-8 max-w-3xl mx-auto bg-primary/10 border-primary animate-scale-in">
                <CardContent className="pt-6">
                  <div className="text-center">
                    <Icon name="Trophy" size={48} className="mx-auto mb-4 text-primary" />
                    <h3 className="text-xl font-bold mb-2">Отличная работа!</h3>
                    <p className="text-muted-foreground">
                      Вы успешно выполнили все упражнения по научному письму
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="test" className="animate-fade-in">
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-2">Финальное тестирование</h2>
              <p className="text-muted-foreground">
                Пройдите тест и получите сертификат об окончании курса
              </p>
            </div>

            {testScore === null ? (
              <div className="max-w-2xl mx-auto">
                <Card className="animate-scale-in">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="secondary">Вопрос {currentTestQuestion + 1} из {finalTest.length}</Badge>
                      <div className="text-sm text-muted-foreground">
                        <Progress value={(currentTestQuestion / finalTest.length) * 100} className="w-32" />
                      </div>
                    </div>
                    <CardTitle className="text-xl">{finalTest[currentTestQuestion].question}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {finalTest[currentTestQuestion].options.map((option, idx) => (
                        <Button
                          key={idx}
                          variant="outline"
                          className="w-full justify-start text-left h-auto py-4"
                          onClick={() => handleTestAnswer(idx)}
                        >
                          <span className="mr-3 font-bold">{String.fromCharCode(65 + idx)}.</span>
                          {option}
                        </Button>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            ) : (
              <div className="max-w-2xl mx-auto space-y-6">
                <Card className="animate-scale-in">
                  <CardContent className="pt-6">
                    <div className="text-center">
                      {testScore >= 4 ? (
                        <>
                          <Icon name="Award" size={64} className="mx-auto mb-4 text-primary" />
                          <h3 className="text-2xl font-bold mb-2">Поздравляем!</h3>
                          <p className="text-muted-foreground mb-4">
                            Вы успешно прошли тестирование: {testScore} из {finalTest.length} правильных ответов
                          </p>
                          <div className="bg-muted p-4 rounded-lg mb-6">
                            <Label htmlFor="student-name" className="text-left block mb-2">Введите ваше имя для получения сертификата:</Label>
                            <Input 
                              id="student-name"
                              placeholder="Иванов Иван Иванович" 
                              value={studentName}
                              onChange={(e) => setStudentName(e.target.value)}
                              className="mb-3"
                            />
                            <Button onClick={handleGetCertificate} disabled={!studentName.trim()} className="w-full">
                              <Icon name="Award" size={18} className="mr-2" />
                              Получить сертификат
                            </Button>
                          </div>
                        </>
                      ) : (
                        <>
                          <Icon name="XCircle" size={64} className="mx-auto mb-4 text-destructive" />
                          <h3 className="text-2xl font-bold mb-2">Попробуйте еще раз</h3>
                          <p className="text-muted-foreground mb-4">
                            Ваш результат: {testScore} из {finalTest.length}. Для получения сертификата необходимо набрать минимум 4 балла.
                          </p>
                        </>
                      )}
                      <Button variant="outline" onClick={resetTest} className="mt-4">
                        <Icon name="RotateCcw" size={18} className="mr-2" />
                        Пройти тест заново
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </TabsContent>
        </Tabs>

        <Dialog open={showCertificate} onOpenChange={setShowCertificate}>
          <DialogContent className="max-w-3xl print:border-0">
            <DialogHeader>
              <DialogTitle>Сертификат об окончании курса</DialogTitle>
              <DialogDescription>Сохраните или распечатайте ваш сертификат</DialogDescription>
            </DialogHeader>
            <div className="border-4 border-primary p-8 bg-gradient-to-br from-background to-muted rounded-lg print:border-8" id="certificate">
              <div className="text-center space-y-4">
                <Icon name="Award" size={80} className="mx-auto text-primary" />
                <h2 className="text-3xl font-bold">СЕРТИФИКАТ</h2>
                <p className="text-lg">об успешном окончании курса</p>
                <div className="my-8">
                  <h3 className="text-4xl font-bold text-primary mb-4">{studentName}</h3>
                  <p className="text-lg text-muted-foreground">
                    успешно прошёл(а) образовательную программу
                  </p>
                  <h4 className="text-2xl font-bold mt-4">«Научное письмо в медицине»</h4>
                </div>
                <div className="flex justify-center items-center gap-8 text-sm text-muted-foreground pt-8 border-t">
                  <div>
                    <p>Результат: <strong>{testScore}/{finalTest.length}</strong></p>
                  </div>
                  <div>
                    <p>Дата: <strong>{certificateDate}</strong></p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex gap-3 print:hidden">
              <Button onClick={downloadCertificate} className="flex-1">
                <Icon name="Download" size={18} className="mr-2" />
                Скачать сертификат
              </Button>
              <Button variant="outline" onClick={() => setShowCertificate(false)}>
                Закрыть
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </main>

      <footer className="border-t mt-16 bg-card">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-sm text-muted-foreground">
            <p>© 2025 Платформа научного письма для медицинских студентов</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;