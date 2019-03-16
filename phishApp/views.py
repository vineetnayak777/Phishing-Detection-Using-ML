# importing required packages
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from phishApp import phishing_detection
from django.http import HttpResponse
from PhishingSiteDetection import loadModel


# disabling csrf (cross site request forgery)
@csrf_exempt
def getResult(request):
    if request.method == 'GET':
        return render(request, 'index.html')
    # if post request came
    if request.method == 'POST':
        # getting values from post
        url = request.POST.get('url')
        response = phishing_detection.resolve(url)
        print(response)
        return render(request, 'response.html', {"r": response})


@csrf_exempt
def API(request):
    # if post request came
    if request.method == 'POST':
        # getting values from post
        url = request.POST.get('url')
        print("URL = " + url)
        response = phishing_detection.resolve(url)
        return HttpResponse(response, status=200)


@csrf_exempt
def screenshot(request):
    if request.method == 'POST':
        image = request.POST.get('image')
        url = request.POST.get('url')
        print("Image = " + image)
        print("Url = "+ url)
        response = loadModel.testCase(image, url)
        return HttpResponse(response, status=200)