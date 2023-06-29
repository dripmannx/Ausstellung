from django.urls import path


from restapi import views
urlpatterns = [
    path("current-pc", views.get_current_pc, name="current-pc"),

    path("current-pc-videos", views.video_view, name="video_view"),
    path("all-videos", views.all_videos_view, name="all_videos_view"),
    path("all-pcs", views.pc_view, name="pc_view"),
    path("video/<int:pk>", views.VideoEditView, name="video"),
    path("pc/<int:pk>", views.PcEditView, name="pc"),
    path("stats",views.client_video_stats,name="stats")


]
