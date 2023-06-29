from distutils.log import error
from email import message
from rest_framework.decorators import api_view
from django.http import HttpResponse
from restapi.serializers import VideoSerializer, PCSerializer
from restapi.models import Video, PC
from rest_framework import status
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse, JsonResponse
from rest_framework.response import Response
# Create your views here.
import os


@csrf_exempt
@api_view(["GET"])
def client_video_stats(request):
    if request.method == "GET":
        clients = PC.objects.count()
        videos = Video.objects.count()
        return JsonResponse({"clients": clients, "videos": videos}, safe=False, status=status.HTTP_200_OK)


@csrf_exempt
@api_view(["GET", "POST"])
def pc_view(request):
    if request.method == "GET":
        query = PC.objects.all()
        serializer = PCSerializer(query, many=True)
        return JsonResponse(serializer.data, safe=False, status=status.HTTP_200_OK)
    elif request.method == 'POST':
        serializer = PCSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(Videos=request.data["Videos"])
            return JsonResponse(serializer.data, status=status.HTTP_201_CREATED)
        return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@csrf_exempt
@api_view(['GET', 'POST'])
def video_view(request):
    REMOTE_ADDR = "REMOTE_ADDR"

    client_ip_address = request.META[REMOTE_ADDR]
    print(client_ip_address)
    """
    Get all Video Objects and add an Object
    """

    if request.method == 'GET':
        # receiving pc wich did the request
        try:
            requested_pc = PC.objects.get(ip_address=client_ip_address)

        except:
            return Response({"message": "PC not found"}, status=status.HTTP_404_NOT_FOUND)
        # check if PC is active and receiving all videos wich are linked to the PC, otherwise it returns HTTP_404_NOT_FOUND

        query = requested_pc.Videos.all()

        serializer = VideoSerializer(query, many=True)
        return JsonResponse(serializer.data, safe=False, status=status.HTTP_200_OK)

    elif request.method == 'POST':

        serializer = VideoSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()

            return JsonResponse(serializer.data, status=status.HTTP_201_CREATED)
        return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@csrf_exempt
@api_view(['GET', 'POST'])
def all_videos_view(request):
    if request.method == "GET":
        query = Video.objects.all()
        serializer = VideoSerializer(query, many=True)
        return JsonResponse(serializer.data, safe=False, status=status.HTTP_200_OK)
    elif request.method == 'POST':

        serializer = VideoSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=status.HTTP_201_CREATED)
        return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@csrf_exempt
@api_view(['GET', 'PATCH', 'DELETE'])
def VideoEditView(request, pk):

    # Retrieve, update or delete a device.

    try:
        video_entry = Video.objects.get(pk=pk)

    except Video.DoesNotExist:
        return HttpResponse(status=404)

    if request.method == 'GET':
        serializer = VideoSerializer(video_entry)
        return JsonResponse(serializer.data)

    elif request.method == 'PATCH':
        for i, j in request.FILES.items():
            print(i, j)
        if "screenshot" in request.FILES:

            video_entry.screenshot = request.FILES["screenshot"]
        if "video" in request.FILES:
            video_entry.video = request.FILES["video"]
        serializer = VideoSerializer(video_entry, data=request.data)
        if serializer.is_valid():

            serializer.save()
            return JsonResponse(serializer.data)
        return JsonResponse(serializer.errors, status=400)

    elif request.method == 'DELETE':
        video_entry.delete()
        return HttpResponse(status=204)


@csrf_exempt
@api_view(['GET', 'PATCH', 'DELETE'])
def PcEditView(request, pk):

    # Retrieve, update or delete a device.

    try:
        pc_entry = PC.objects.get(pk=pk)

    except PC.DoesNotExist:
        return JsonResponse({"message": "PC not found"}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = PCSerializer(pc_entry)
        return JsonResponse(serializer.data)

    elif request.method == 'PATCH':

        data = request.data

        serializer = PCSerializer(pc_entry, data=data)
        if serializer.is_valid():
            serializer.save(Videos=data["Videos"])
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        pc_entry.delete()
        return HttpResponse({message: "PC deleted"}, status=status.HTTP_204_NO_CONTENT)


@api_view(['GET'])
def get_current_pc(request):
    # receiving pc wich did the request
    REMOTE_ADDR = "REMOTE_ADDR"
    client_ip_address = request.META[REMOTE_ADDR]
    print(client_ip_address)
    """
    Get all Video Objects and add an Object
    """

    if request.method == 'GET':

        # check if PC exists and receiving all videos wich are linked to the PC, otherwise it returns HTTP_404_NOT_FOUND
        try:

            requested_pc = PC.objects.get(ip_address=client_ip_address)
        except:
            return JsonResponse({"error": "pc not found"}, status=status.HTTP_404_NOT_FOUND)

        print(requested_pc)
        """ query = requested_pc """

        serializer = PCSerializer(
            requested_pc)

        return JsonResponse(serializer.data, status=status.HTTP_200_OK)
