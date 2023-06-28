from rest_framework import serializers
from restapi.models import PC, Video


class VideoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Video
        fields = ("__all__")
   
class PCSerializer(serializers.ModelSerializer):
    Videos = VideoSerializer(many=True, read_only=True)

    class Meta:
        model = PC
        fields = ("id", "pc_name", "ip_address", "is_expo_client", "Videos")

    def get_or_create_videos(self, videos):
        video_ids = []
        for video in videos:
            video_instance, created = Video.objects.get_or_create(
                pk=video.get("id"), defaults=video)
            video_ids.append(video_instance.pk)
        return video_ids

    def create_or_update_videos(self, videos):

        video_ids = []
        # video is the pk of the video in an array
        for video in videos:
            video_instance, created = Video.objects.get_or_create(
                pk=video.get("id"), defaults=video)
            video_ids.append(video_instance.pk)
        return video_ids

    def create(self, validated_data):
        video = validated_data.pop('Videos', [])
        pc = PC.objects.create(**validated_data)
        pc.Videos.set(self.get_or_create_videos(video))
        return pc

    def update(self, instance, validated_data):
        print(validated_data)
        video = validated_data.pop('Videos', [])

        instance.Videos.set(self.create_or_update_videos(video))
        fields = ["id",
                  "pc_name",
                  "ip_address",
                  "is_expo_client","Videos"]
        for field in fields:
            try:
                setattr(instance, field, validated_data[field])
            except KeyError:  # validated_data may not contain all fields during HTTP PATCH
                pass
        instance.save()
        return instance


class CurrentPCSerializer(serializers.Serializer):
    Videos = VideoSerializer(many=True, read_only=True)

    class Meta:
        model = PC
        fields = ("id", "pc_name", "ip_address", "is_expo_client", "Videos")
