import serial  # sudo pip install pyserial should work
import requests

serial_port = 'COM3'
baud_rate = 9600; #In arduino, Serial.begin(baud_rate)
write_to_file_path = "output.txt"

output_file = open(write_to_file_path, "w+")
ser = serial.Serial(serial_port, baud_rate)


url = 'http://localhost:8000/weather-update' # Set destination URL here

# print(json)


while True:
    line = ser.readline()
    line = line.decode("utf-8") #readline returns a binary, convert to string
    weatherArr = line.split(',')
    print(weatherArr)

    post_fields = {'temperature': weatherArr[0], 'humidity': weatherArr[1]}
    requests.post(url, json=post_fields)

    print(line)
    output_file.write(line)
