import csv
import math

with open('starsoriginal.csv') as csv_file:
    csv_reader = csv.reader(csv_file, delimiter=',')
    for row in csv_reader:
        data_read = [row for row in csv_reader]
 
stars=[]
for row in data_read:
    hours = float(row[0])
    min = float(row[1])
    seg = float(row[2])
    rahours = hours+(min+seg/60)/60
    radegress = rahours*360/24
    radradians = math.radians(radegress)
    deg = float(row[3])
    dem = float(row[4])
    des = float(row[5])
    if (deg<0):
        desex = deg-(dem+des/60)/60
    else:
        desex = deg+(dem+des/60)/60
    derad = math.radians(desex)
    
    stars.append(['{:.5f}'.format(radradians),'{:.5f}'.format(derad),'{:.1f}'.format(float(row[6])),row[7].strip()])

with open("planetarium.stars.csv", "wt") as fp:
    writer = csv.writer(fp, delimiter=",")
    # writer.writerow(["your", "header", "foo"])  # write header
    writer.writerows(stars)
