import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [selectedMaterial, setSelectedMaterial] = useState<string | null>(null);
  const [exerciseProgress, setExerciseProgress] = useState(0);
  const [completedExercises, setCompletedExercises] = useState<number[]>([]);

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

  const handleExerciseComplete = (exerciseId: number) => {
    if (!completedExercises.includes(exerciseId)) {
      const newCompleted = [...completedExercises, exerciseId];
      setCompletedExercises(newCompleted);
      setExerciseProgress((newCompleted.length / exercises.length) * 100);
    }
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
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
            <TabsTrigger value="materials" className="flex items-center gap-2">
              <Icon name="BookOpen" size={18} />
              Материалы
            </TabsTrigger>
            <TabsTrigger value="exercises" className="flex items-center gap-2">
              <Icon name="PenTool" size={18} />
              Упражнения
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
        </Tabs>
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
