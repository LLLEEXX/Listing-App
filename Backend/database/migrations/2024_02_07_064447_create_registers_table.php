    <?php

    use Illuminate\Database\Migrations\Migration;
    use Illuminate\Database\Schema\Blueprint;
    use Illuminate\Support\Facades\Schema;

    return new class extends Migration
    {
        /**
         * Run the migrations.
         */
        public function up(): void
        {
            Schema::create('users', function (Blueprint $table) {
                $table->uuid('id')->primary();
                $table->string('fullname');
                $table->string('password');
                $table->string('username');
                $table->string('nationality');
                $table->string('mobileNum');
                $table->string('email');
                $table->string('gender');
                $table->string('role')->default('user');
                $table->boolean('recieveUpdate');
                $table->boolean('termsandCon');
                $table->timestamp('email_verified_at')->nullable();
                $table->date('updated_at');
                $table->date('created_at');
            });
        }

        /**
         * Reverse the migrations.
         */
        public function down(): void
        {
            Schema::dropIfExists('users');
        }
    };
