import numpy as np
import matplotlib.pyplot as plt
from tensorflow import keras

class SimpleNet:
    def __init__(self):
        # Слой 1: 784 ВХОДА (28*28) -> 128 нейров
        self.weights1 = np.random.randn(784, 128) * 0.1
        self.bias1 = np.zeros(128)
    
        # 2  слой: 128 -> 10 
        self.weights2 = np.random.randn(128, 10) * 0.1
        self.bias2 = np.zeros(10)

    def forward(self, x): 
        # Прохо д через первый сллой
        layer1 = x @ self.weights1 + self.bias1     # Матричное умножение
        layer1 = np.maximum(0, layer1)  # Активация ReLU

        # Прохо д через второй слой
        layer2 = layer1 @ self.weights2 + self.bias2
        layer2 = np.maximum(0, layer2)  # Активация ReLU

        return layer2
    
# Загружаем датасет MNIST
(x_train, y_train), (x_test, y_test) = keras.datasets.mnist.load_data()

net = SimpleNet()
# Берем случайное изображение из обучающей выборки
random_idx = np.random.randint(0, len(x_train))
image = x_train[random_idx].flatten()  # Преобразуем в одномерный массив
true_label = y_train[random_idx]

# Отображаем изображение
plt.imshow(x_train[random_idx], cmap='gray')
plt.title(f'Цифра: {true_label}')
plt.axis('off')
plt.show()

# Нормализуем изображение для сети (значения от 0 до 1)
image_normalized = image.astype(np.float32) / 255.0

prediction = net.forward(image_normalized)
print(f'Истинная цифра: {true_label}')
print(f'Предсказание сети: {prediction}')
print(f'Предсказанный класс: {np.argmax(prediction)}')