from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json

@csrf_exempt
def get_selection(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            category = data.get('category', '')
            return JsonResponse({'category': category})
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON'}, status=400)
    return JsonResponse({'error': 'Invalid request method'}, status=405)
